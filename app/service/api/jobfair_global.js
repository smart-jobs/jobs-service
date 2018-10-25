'use strict';
/**
 * 查询全站招聘会数据
 */
const assert = require('assert');
const _ = require('lodash');
const moment = require('moment');
const { ObjectId } = require('mongoose').Types;
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { JobfairCorpStatus, UserOrigin, TicketType, TicketStatus } = require('../../util/constants');
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
  async corp_list({ id }, { skip = 0, limit = 100 }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(id, '招聘会ID不能为空');

    // TODO: 查询所有的招聘会ID
    const rs = await this.mCorp.find({ id, status: JobfairCorpStatus.NORMAL },
      { corp: 1, jobs: 1 },
      { skip, limit, sort: { 'meta.createdAt': -1 } }).exec();

    // TODO: 转换输出数据格式
    return rs.map(p => ({
      corpid: p.corp.id,
      corpname: p.corp.name,
      jobs: p.jobs,
    }));
  }

  async corp_fetch({ _id, id, 'corp.id': corpid }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    let filter = { _id: ObjectId(_id) };
    if (!_id) {
      assert(corpid, '企业ID不能为空');
      assert(id, '招聘会ID不能为空');
      filter = { id, 'corp.id': corpid };
    }

    // TODO:检查数据是否存在
    const doc = await this.mCorp.findOne(filter).exec();
    return doc;
  }


  // 申请招聘会门票
  async ticket_apply({ id }, { user }) {
    // TODO: user应该从token中获取，此处暂时由参数传入
    // 检查数据
    assert(id, 'id(招聘会ID)不能为空');
    assert(_.isObject(user), 'user必须是一个对象');
    assert(user.id, 'user.id不能为空');
    assert(user.name, 'user.name不能为空');

    // TODO:检查数据是否存在
    const doc = await this.model.findById(ObjectId(id)).exec();
    if (isNullOrUndefined(doc)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '招聘会信息不存在');
    }

    // TODO:检查数据状态
    const today = moment().format('L');
    if (doc.date < today) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '招聘会已结束');
    }

    const { id: userid, name, yxdm } = user;

    // TODO: 检查是否已申请
    let apply = await this.mTicket.findOne({ id, 'user.id': userid }).exec();
    if (apply) {
      throw new BusinessError(ErrorCode.DATA_EXISTED, '不能重复申请');
    }

    const origin = (yxdm === doc.unit) ? UserOrigin.LOCAL : UserOrigin.OTHER;
    let type = TicketType.NORMAL;
    if (origin === UserOrigin.OTHER) {
      // TODO: 检查门票数量限制
      const { count: limit = 0 } = doc.limit || {};
      if (limit > 0) {
        const count = await this.mTicket.countDocuments({ id, origin: UserOrigin.LOCAL, type: TicketType.NORMAL }).exec();
        if (count >= limit) {
          type = TicketType.LIMITED;
        }
      }
    }

    // TODO:保存数据
    apply = await this.mTicket.create({ id, origin, type, user: { id: userid, name, yxdm }, verify: { status: TicketStatus.NORMAL } });

    return apply;
  }

  // 查询用户所申请的所有门票列表
  async ticket_mylist({ 'user.id': userid }, { skip = 0, limit = 100 }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(userid, 'user.id不能为空');

    // TODO: 查询所有的招聘会ID
    const rs = await this.mTicket.find({ 'user.id': userid },
      null,
      { skip, limit, sort: { 'meta.createdAt': -1 } }).exec();

    // TODO: 查询招聘会信息
    const ids = rs.map(p => ObjectId(p.id));
    let jobfairs = await this.model.find({ _id: { $in: ids } }, { subject: 1, unit: 1, date: 1 }).exec();
    jobfairs = jobfairs.reduce((p, c) => {
      p[c._id.toString()] = _.omit(c.toObject(), [ '_id' ]);
      return p;
    }, {});

    // TODO: 转换输出数据格式，增加招聘会信息
    return rs.map(p => ({
      ...p.toObject(),
      ...jobfairs[p.id],
    }));
  }

  // 招聘会门票扫码验证
  async ticket_verify({ _id, device }) {
    // TODO: user应该从token中获取，此处暂时由参数传入
    // 检查数据
    assert(_id, '_id(招聘会门票ID)不能为空');

    // TODO:检查数据是否存在
    const doc = await this.mTicket.findById(ObjectId(_id)).exec();
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
    await doc.save();

    return doc;
  }

}

module.exports = JobinfoGlobalService;
