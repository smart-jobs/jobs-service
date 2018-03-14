'use strict';

const assert = require('assert');
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { isNullOrUndefined } = require('naf-core').Util;
const { CrudService } = require('naf-framework-mongoose').Services;
const { JobfairStatus, JobfairCorpStatus } = require('../../util/constants');

class JobinfoService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.mFair = this._model(ctx.model.Jobfair);
    this.model = this.mFair.model;
  }

  // async query({ skip, limit, order } = {}, data = {}) {
  //   // const rs = await this._find(trimData(data), null, trimData({ skip, limit, sort: order && { [order]: 1 } }));
  //   const rs = await this.model.find({}, null, {}).exec();
  //   return rs;
  // }

  async corp_apply({ _id, 'corp.id': corpid, 'corp.name': corpname }, { jobs }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(corpid, '企业ID不能为空');
    assert(corpname, '企业名称不能为空');
    // 检查数据
    assert(_id, '_id不能为空');

    // TODO:检查数据是否存在
    const entity = await this.mFair._findOne({ _id });
    if (isNullOrUndefined(entity)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '招聘会信息不存在');
    }
    // TODO: 检查是否已申请
    if (entity.corps && entity.corps.some(p => p.id === corpid)) {
      throw new BusinessError(ErrorCode.DATA_EXISTED, '不能重复申请');
    }
    // TODO:检查数据状态
    if (entity.status !== JobfairStatus.OPENING) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '该招聘会已关闭展位预约');
    }

    // TODO:保存数据
    entity.corps.push({ id: corpid, name: corpname, jobs, status: JobfairCorpStatus.PENDING });
    await entity.save();
    return 'updated';
  }

  async corp_update({ _id, 'corp.id': corpid }, { jobs }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(corpid, '企业ID不能为空');
    // 检查数据
    assert(_id, '_id不能为空');

    // TODO:检查数据是否存在
    const entity = await this.mFair._findOne({ _id });
    if (isNullOrUndefined(entity)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '招聘会信息不存在');
    }
    // TODO: 检查是否已申请
    const corp = entity.corps.find(p => p.id === corpid);
    if (isNullOrUndefined(corp)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '还未申请招聘会展位');
    }
    // TODO:检查数据状态
    if (corp.status === JobfairCorpStatus.NORMAL) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '展位申请已审核，不能修改');
    }

    // TODO:保存数据
    corp.jobs = jobs;
    await entity.save();
    return 'updated';
  }

  async corp_mylist({ 'corp.id': corpid }, { skip = 0, limit = 100 }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(corpid, '企业ID不能为空');

    // TODO:检查数据是否存在
    const rs = await this.mFair._find({ corps: { $elemMatch: { id: corpid } } },
      null,
      { skip, limit, sort: { 'meta.createdAt': -1 } });
    // TODO: 转换输出数据格式
    return rs.map(p => ({
      _id: p._id,
      title: p.title,
      createAt: p.meta.createdAt,
      school: p.school,
    }));
  }
}

module.exports = JobinfoService;
