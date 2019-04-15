'use strict';
/**
 * 查询全站招聘会数据
 */
const assert = require('assert');
const _ = require('lodash');
const moment = require('moment');
const { ObjectId } = require('mongoose').Types;
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { JobfairCorpStatus, UserOrigin, TicketType, TicketStatus, CheckinStatus } = require('../../util/constants');
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { isNullOrUndefined } = require('naf-core').Util;

class JobinfoGlobalService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.app.model.Jobfair; // 使用app.model，不支持和多租户模型，即查询所有数据
    this.mCorp = this.app.model.JobfairCorp;
    this.mTicket = this.app.model.JobfairTicket;
  }

  // 查询招聘会包含的参展企业列表（审核通过的企业）
  async corp_list({ fair_id }, { skip = 0, limit = 100 }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(fair_id, '招聘会ID不能为空');

    // TODO: 查询所有的招聘会ID
    const rs = await this.mCorp.find({ fair_id, status: JobfairCorpStatus.NORMAL },
      { corpid: 1, corpname: 1, jobs: 1 },
      { skip, limit, sort: { 'meta.createdAt': -1 } }).exec();

    // TODO: 转换输出数据格式
    return rs;
  }

  async corp_fetch({ id, fair_id, corpid }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    if (!id) {
      assert(corpid, '企业ID不能为空');
      assert(fair_id, '招聘会ID不能为空');
      return await this.mCorp.findOne({ fair_id, corpid }, '+description').exec();
    }

    return await this.mCorp.findById(id, '+description');
  }


  async corp_checkin({ fair_id, corpid, device }) {
    assert(corpid, '企业ID不能为空');
    assert(fair_id, '招聘会ID不能为空');

    const doc = await this.mCorp.findOne({ fair_id, corpid }).exec();
    if (doc.checkin && doc.checkin.status === CheckinStatus.FINISH) {
      throw new BusinessError(ErrorCode.SERVICE_FAULT, '不能重复签到');
    }
    // TODO:保存数据
    if (doc.checkin) {
      doc.checkin.status = CheckinStatus.FINISH;
      doc.checkin.device = device;
    } else {
      doc.checkin = { status: CheckinStatus.FINISH, device };
    }
    doc.checkin.time = new Date();
    await doc.save();
    return { corpid: doc.corpid, corpname: doc.corpname, checkin: doc.checkin };
  }

  // 申请招聘会门票
  async ticket_apply({ fair_id, userid }) {
    // TODO: user应该从token中获取，此处暂时由参数传入
    // 检查数据
    assert(fair_id, '招聘会ID不能为空');
    assert(userid, '用户ID不能为空');

    // TODO: 查询用户信息
    const user = await this.service.axios.user.fetch({ id: userid });
    if (!user) {
      throw new BusinessError(ErrorCode.USER_NOT_EXIST, '用户信息不存在');
    }

    // TODO:检查数据是否存在
    const doc = await this.model.findById(ObjectId(fair_id)).exec();
    if (isNullOrUndefined(doc)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '招聘会信息不存在');
    }

    // TODO:检查数据状态
    const today = moment().format('L');
    if (doc.date < today) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '招聘会已结束');
    }
    if (doc.external === 1) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '该招聘会不支持在线申请');
    }

    const { xm, xb, yxdm, yxmc, zydm, zymc, xldm, xl } = user;

    // TODO: 检查是否已申请
    let apply = await this.mTicket.findOne({ fair_id, userid }).exec();
    if (apply) {
      throw new BusinessError(ErrorCode.DATA_EXISTED, '不能重复申请');
    }

    const origin = (yxdm === doc.unit) ? UserOrigin.LOCAL : UserOrigin.OTHER;
    let type = TicketType.NORMAL;
    if (origin === UserOrigin.OTHER) {
      // TODO: 检查门票数量限制
      const { count: limit = 0 } = doc.limit || {};
      if (limit >= 0) {
        const count = await this.mTicket.countDocuments({ fair_id, origin: UserOrigin.OTHER, type: TicketType.NORMAL }).exec();
        if (count >= limit) {
          type = TicketType.LIMITED;
        }
      }
    }

    // TODO:保存数据
    apply = await this.mTicket.create({
      userid, fair_id, origin, type,
      user: { id: userid, name: xm, xm, xb, yxdm, yxmc, zydm, zymc, xldm, xl },
      verify: { status: TicketStatus.NORMAL }
    });

    return apply;
  }

  // 查询用户所申请的所有门票列表
  async ticket_mylist({ userid }, { skip = 0, limit = 100 }) {
    // TODO: user_id应该从token中获取，此处暂时由参数传入
    assert(userid, '用户ID不能为空');

    // TODO: 查询所有的招聘会ID
    const rs = await this.mTicket.find({ userid },
      null,
      { skip, limit, sort: { 'meta.createdAt': -1 } }).exec();

    // TODO: 查询招聘会信息
    const ids = rs.map(p => ObjectId(p.fair_id));
    let jobfairs = await this.model.find({ _id: { $in: ids } }, { subject: 1, unit: 1, date: 1, time: 1, address: 1 }).exec();
    jobfairs = jobfairs.reduce((p, c) => {
      p[c.id] = _.omit(c.toObject(), [ '_id' ]);
      return p;
    }, {});

    // TODO: 转换输出数据格式，增加招聘会信息
    return rs.map(p => ({
      ...p.toObject(),
      ...jobfairs[p.fair_id],
    }));
  }

  // 招聘会门票扫码验证
  async ticket_verify({ ticket_id, device }) {
    // TODO: user应该从token中获取，此处暂时由参数传入
    // 检查数据
    assert(ticket_id, '招聘会门票ID不能为空');

    // TODO:检查数据是否存在
    const doc = await this.mTicket.findById(ObjectId(ticket_id)).exec();
    if (isNullOrUndefined(doc)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '招聘会门票信息不存在');
    }

    // TODO:检查数据状态
    if (doc.verify && doc.verify.status === TicketStatus.USED) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '不能重复验证');
    }

    // TODO:保存数据
    if (doc.verify) {
      doc.verify.status = TicketStatus.USED;
      doc.verify.device = device;
    } else {
      doc.verify = { status: TicketStatus.USED, device };
    }
    doc.verify.time = new Date();
    await doc.save();

    return doc;
  }

  // 扫码验证设备登录
  async login({ fair_id, password, device }) {
    this.ctx.logger.debug('[JobinfoGlobalService] request login: ', device);
    // TODO: user应该从token中获取，此处暂时由参数传入
    // 检查数据
    assert(fair_id, '招聘会门票ID不能为空');

    // TODO: 检查数据是否存在
    const doc = await this.model.findById(ObjectId(fair_id), '+secret').exec();
    if (isNullOrUndefined(doc)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '招聘会信息不存在');
    }

    // TODO: 校验密码
    if (doc.secret !== password) {
      throw new BusinessError(ErrorCode.BAD_PASSWORD, '密码校验失败');
    }

    return _.omit(doc.toObject(), 'secret');
  }
}

module.exports = JobinfoGlobalService;
