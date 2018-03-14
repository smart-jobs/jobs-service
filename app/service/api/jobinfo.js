'use strict';

const assert = require('assert');
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { isNullOrUndefined } = require('naf-core').Util;
const { CrudService } = require('naf-framework-mongoose').Services;
const { JobinfoStatus } = require('../../util/constants');

class JobinfoService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.mInfo = this._model(ctx.model.Jobinfo);
    this.model = this.mInfo.model;
  }

  // async query({ skip, limit, order } = {}, data = {}) {
  //   // const rs = await this._find(trimData(data), null, trimData({ skip, limit, sort: order && { [order]: 1 } }));
  //   const rs = await this.model.find({}, null, {}).exec();
  //   return rs;
  // }

  async create({ 'corp.id': corpid, 'corp.name': corpname }, { title, content, city }) {
    // TODO: coreid和corpname应该从token中获取，此处暂时由参数传入
    assert(corpid, '企业ID不能为空');
    assert(corpname, '企业名称不能为空');
    // 检查数据
    assert(title, 'title不能为空');
    assert(content, 'content不能为空');
    assert(city, 'city不能为空');

    const corp = { id: corpid, name: corpname };

    // TODO:保存数据
    const res = await this.mInfo._create({ title, content, city, corp, status: JobinfoStatus.PENDING });
    return res;
  }

  async update({ _id, 'corp.id': corpid }, { title, content, city }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(corpid, '企业ID不能为空');
    // 检查数据
    assert(_id, '_id不能为空');

    // TODO:检查数据是否存在
    const entity = await this.mInfo._findOne({ _id, 'corp.id': corpid });
    if (isNullOrUndefined(entity)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST);
    }
    // TODO:检查数据状态
    if (entity.status === JobinfoStatus.NORMAL) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '数据无法修改');
    }

    // TODO:保存数据
    const res = await this.mInfo._findByIdAndUpdate(_id, { title, content, city });
    return res;
  }


}

module.exports = JobinfoService;
