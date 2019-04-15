'use strict';

const assert = require('assert');
const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { isNullOrUndefined, trimData } = require('naf-core').Util;
const { isArray } = require('lodash');
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { CampusTalkStatus } = require('../../util/constants');

class CampusTalkService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Campus;
  }

  async create({ corpid }, { subject, content, address, date, time, contact, email, jobs }) {
    // TODO: coreid和corpname应该从token中获取，此处暂时由参数传入
    assert(corpid, '企业ID不能为空');
    // 检查数据
    assert(subject, 'subject不能为空');
    assert(content, 'content不能为空');
    assert(time, 'time不能为空');
    assert(contact, 'contact不能为空');
    assert(email, 'email不能为空');
    assert(date, 'date不能为空');
    assert(isArray(jobs), 'jobs必须是一个对象数组');

    // TODO: 查询企业信息
    let corp = await this.service.axios.corp.fetch({ corpid });
    if (!corp) {
      throw new BusinessError(ErrorCode.USER_NOT_EXIST, '企业信息不存在');
    }
    corp = { corpid, corpname: corp.corpname };

    // TODO:保存数据
    const data = { subject, content, ...corp, status: CampusTalkStatus.PENDING, address, time, contact, email, jobs, date, unit: this.tenant };

    const res = await this.model.create(data);
    return res;
  }

  async update({ id, corpid }, { subject, content, address, time, contact, email, jobs }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(corpid, '企业ID不能为空');
    // 检查数据
    assert(id, 'id不能为空');

    // TODO:检查数据是否存在
    const entity = await this.model.findOne({ _id: ObjectId(id), corpid }).exec();
    if (isNullOrUndefined(entity)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST);
    }

    // TODO:检查数据状态
    if (entity.status === CampusTalkStatus.NORMAL) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '数据无法修改');
    }

    // TODO:保存数据
    const data = { subject, content, address, time, contact, email, jobs };
    const res = await this.model.findByIdAndUpdate(id, data).exec();
    return res;
  }

  // 添加职位信息
  async job_add({ id, corpid }, { name, count = 0, requirement }) {
    // TODO:检查数据是否存在
    const doc = await this.model.findOne({ id, corpid }).exec();
    if (!doc) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '宣讲会信息记录不存在');
    }

    // TODO:检查数据状态
    if (doc.status === CampusTalkStatus.NORMAL) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '宣讲会申请已审核，不能修改');
    }

    // TODO: 检查招聘职位是否存在
    if (_.isArray(doc.jobs) && doc.jobs.some(p => p.name === name)) {
      throw new BusinessError(ErrorCode.DATA_EXISTED, '招聘职位信息已存在');
    }

    // TODO: 保存数据
    if (_.isArray(doc.jobs)) {
      doc.jobs.push({ name, count, requirement });
    } else {
      doc.jobs = [{ name, count, requirement }];
    }
    await doc.save();

    return doc;
  }

  // 修改职位信息
  async job_update({ job_id, corpid }, { name, count = 0, requirement }) {
    assert(job_id, '职位ID不能为空');
    assert(corpid, '企业ID不能为空');

    // TODO:检查数据是否存在
    const doc = await this.mCorp.findOne({ jobs: { $elemMatch: { _id: ObjectId(job_id) } }, corpid }).exec();
    if (!doc) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '招聘职位信息记录不存在');
    }

    // TODO:检查数据状态
    if (doc.status === CampusTalkStatus.NORMAL) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '宣讲会申请已审核，不能修改');
    }

    // TODO: 保存数据
    const subdoc = doc.jobs.id(ObjectId(job_id));
    Object.assign(subdoc, trimData({ name, count, requirement }));
    await doc.save();

    return doc;
  }

  // 招聘会企业删除职位信息
  async job_delete({ job_id, corpid }) {
    assert(job_id, '职位ID不能为空');
    assert(corpid, '企业ID不能为空');

    // TODO:检查数据是否存在
    const doc = await this.mCorp.findOne({ jobs: { $elemMatch: { _id: ObjectId(job_id) } }, corpid }).exec();
    if (!doc) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '招聘职位信息记录不存在');
    }

    // TODO:检查数据状态
    if (doc.status === CampusTalkStatus.NORMAL) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '宣讲会申请已审核，不能修改');
    }

    // TODO: 保存数据
    doc.jobs.id(ObjectId(job_id)).remove();
    await doc.save();

    return doc;
  }
}

module.exports = CampusTalkService;
