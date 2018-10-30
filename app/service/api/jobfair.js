'use strict';

const assert = require('assert');
const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { isNullOrUndefined, trimData } = require('naf-core').Util;
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { JobfairStatus, JobfairCorpStatus } = require('../../util/constants');

class JobinfoService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Jobfair;
    this.mCorp = this.ctx.model.JobfairCorp;
  }

  // async query({ skip, limit, order } = {}, data = {}) {
  //   // const rs = await this.model.find(trimData(data), null, trimData({ skip, limit, sort: order && { [order]: 1 } })).exec();
  //   const rs = await this.model.find({}, null, {}).exec();
  //   return rs;
  // }

  async corp_apply({ fair_id, 'corp.id': corp_id }, { jobs }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(corp_id, '企业ID不能为空');
    // 检查数据
    assert(fair_id, '招聘会ID不能为空');

    // TODO: 查询企业信息
    const corp = await this.service.axios.corp.fetch({ id: corp_id });
    if (!corp) {
      throw new BusinessError(ErrorCode.USER_NOT_EXIST, '企业信息不存在');
    }
    const corp_name = corp.corpname;

    // TODO:检查数据是否存在
    const doc = await this.model.findById(ObjectId(fair_id)).exec();
    if (isNullOrUndefined(doc)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '招聘会信息不存在');
    }
    // TODO:检查数据状态
    if (doc.status !== JobfairStatus.OPENING) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '该招聘会已关闭展位预约');
    }

    // TODO: 检查是否已申请
    let apply = await this.mCorp.findOne({ fair_id, 'corp.id': corp_id }).exec();
    if (apply) {
      throw new BusinessError(ErrorCode.DATA_EXISTED, '不能重复申请');
    }

    // TODO:保存数据
    apply = await this.mCorp.create({ fair_id, corp: { id: corp_id, name: corp_name }, jobs, status: JobfairCorpStatus.PENDING });

    return apply;
  }

  async corp_update({ id, fair_id, 'corp.id': corp_id }, { jobs }) {

    // TODO:检查数据是否存在
    const doc = await this.corp_fetch({ id, fair_id, 'corp.id': corp_id });
    if (isNullOrUndefined(doc)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '参会申请信息不存在');
    }
    // TODO:检查数据状态
    if (doc.status === JobfairCorpStatus.NORMAL) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '展位申请已审核，不能修改');
    }

    // TODO:保存数据
    doc.jobs = jobs;
    await doc.save();

    return doc;
  }

  async corp_fetch({ id, fair_id, 'corp.id': corp_id }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(corp_id, '企业ID不能为空');
    let filter = { _id: ObjectId(id), 'corp.id': corp_id };
    if (!id) {
      assert(fair_id, '招聘会ID不能为空');
      filter = { fair_id, 'corp.id': corp_id };
    }

    // TODO:检查数据是否存在
    const doc = await this.mCorp.findOne(filter).exec();
    return doc;
  }

  // 查询企业参加的招聘会列表
  async corp_mylist({ 'corp.id': corp_id }, { skip = 0, limit = 100 }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(corp_id, '企业ID不能为空');

    // TODO: 查询所有的招聘会ID
    let rs = await this.mCorp.find({ 'corp.id': corp_id },
      { fair_id: 1 },
      { skip, limit, sort: { 'meta.createdAt': -1 } }).exec();
    const ids = rs.map(p => ObjectId(p.fair_id));

    // TODO: 查询招聘会信息
    rs = await this.model.find({ _id: { $in: ids } }, null, { sort: { 'meta.createdAt': -1 } }).exec();

    // TODO: 转换输出数据格式
    return rs.map(p => ({
      _id: p._id,
      subject: p.subject,
      unit: p.unit,
      date: p.date,
      time: p.time,
    }));
  }

  // 查询招聘会包含的参展企业列表（审核通过的企业）
  async corp_list({ fair_id }, { skip = 0, limit = 100 }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(fair_id, '招聘会ID不能为空');

    // TODO: 查询所有的招聘会ID
    const rs = await this.mCorp.find({ fair_id, status: JobfairCorpStatus.NORMAL },
      { corp: 1, jobs: 1 },
      { skip, limit, sort: { 'meta.createdAt': -1 } }).exec();

    // TODO: 转换输出数据格式
    return rs.map(p => ({
      corp_id: p.corp.id,
      corp_name: p.corp.name,
      jobs: p.jobs,
    }));
  }

  // 招聘会企业添加职位信息
  async corp_job_add({ id, fair_id, 'corp.id': corp_id }, { name, count = 0, requirement }) {

    // TODO:检查数据是否存在
    const doc = await this.corp_fetch({ id, fair_id, 'corp.id': corp_id });
    if (!doc) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '招聘会企业信息记录不存在');
    }

    // TODO:检查数据状态
    if (doc.status === JobfairCorpStatus.NORMAL) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '展位申请已审核，不能修改');
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

  // 招聘会企业添加职位信息
  async corp_job_update({ job_id, 'corp.id': corp_id }, { name, count = 0, requirement }) {
    assert(job_id, '职位ID不能为空');
    assert(corp_id, '企业ID不能为空');

    // TODO:检查数据是否存在
    const doc = await this.mCorp.findOne({ jobs: { $elemMatch: { _id: ObjectId(job_id) } }, 'corp.id': corp_id }).exec();
    if (!doc) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '招聘职位信息记录不存在');
    }

    // TODO:检查数据状态
    if (doc.status === JobfairCorpStatus.NORMAL) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '展位申请已审核，不能修改');
    }

    // TODO: 保存数据
    const subdoc = doc.jobs.id(ObjectId(job_id));
    Object.assign(subdoc, trimData({ name, count, requirement }));
    await doc.save();

    return doc;
  }

  // 招聘会企业删除职位信息
  async corp_job_delete({ job_id, 'corp.id': corp_id }) {
    assert(job_id, '职位ID不能为空');
    assert(corp_id, '企业ID不能为空');

    // TODO:检查数据是否存在
    const doc = await this.mCorp.findOne({ jobs: { $elemMatch: { _id: ObjectId(job_id) } }, 'corp.id': corp_id }).exec();
    if (!doc) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '招聘职位信息记录不存在');
    }

    // TODO:检查数据状态
    if (doc.status === JobfairCorpStatus.NORMAL) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '展位申请已审核，不能修改');
    }

    // TODO: 保存数据
    doc.jobs.id(ObjectId(job_id)).remove();
    await doc.save();

    return doc;
  }

}

module.exports = JobinfoService;
