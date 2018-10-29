'use strict';

const assert = require('assert');
const { ObjectId } = require('mongoose').Types;
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { isNullOrUndefined } = require('naf-core').Util;
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { JobinfoStatus } = require('../../util/constants');

class JobinfoService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Jobinfo;
  }

  async create({ 'corp.id': corp_id }, { title, content, city }) {
    // TODO: coreid和corpname应该从token中获取，此处暂时由参数传入
    assert(corp_id, '企业ID不能为空');
    // 检查数据
    assert(title, 'title不能为空');
    assert(content, 'content不能为空');
    assert(city, 'city不能为空');

    // TODO: 查询企业信息
    let corp = await this.service.axios.corp.fetch({ id: corp_id });
    if (!corp) {
      throw new BusinessError(ErrorCode.USER_NOT_EXIST, '企业信息不存在');
    }
    corp = { id: corp_id, name: corp.name };

    // TODO:保存数据
    const res = await this.model.create({ title, content, city, corp, status: JobinfoStatus.PENDING });
    return res;
  }

  async update({ id, 'corp.id': corp_id }, { title, content, city }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(corp_id, '企业ID不能为空');
    // 检查数据
    assert(id, 'id不能为空');

    // TODO:检查数据是否存在
    const entity = await this.model.findOne({ _id: ObjectId(id), 'corp.id': corp_id }).exec();
    if (isNullOrUndefined(entity)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST);
    }
    // TODO:检查数据状态
    if (entity.status === JobinfoStatus.NORMAL) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '数据无法修改');
    }

    // TODO:保存数据
    const res = await this.model.findByIdAndUpdate(id, { title, content, city }, { new: true }).exec();
    return res;
  }


}

module.exports = JobinfoService;
