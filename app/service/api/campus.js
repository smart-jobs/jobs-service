'use strict';

const assert = require('assert');
const { ObjectId } = require('mongoose').Types;
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { isNullOrUndefined } = require('naf-core').Util;
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
    let corp = await this.service.axios.corp.fetch({ id: corpid });
    if (!corp) {
      throw new BusinessError(ErrorCode.USER_NOT_EXIST, '企业信息不存在');
    }
    corp = { id: corpid, name: corp.corpname };

    // TODO:保存数据
    const data = { subject, content, corp, status: CampusTalkStatus.PENDING,
      address, time, contact, email, jobs, date, unit: this.tenant };

    const res = await this.model.create(data);
    return res;
  }

  async update({ id, corpid }, { subject, content, address, time, contact, email, jobs }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(corpid, '企业ID不能为空');
    // 检查数据
    assert(id, 'id不能为空');

    // TODO:检查数据是否存在
    const entity = await this.model.findOne({ _id: ObjectId(id), 'corp.id': corpid }).exec();
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


}

module.exports = CampusTalkService;
