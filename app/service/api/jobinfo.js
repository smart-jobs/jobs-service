'use strict';

const assert = require('assert');
const _ = require('lodash');
const moment = require('moment');
const { ObjectId } = require('mongoose').Types;
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { isNullOrUndefined, trimData } = require('naf-core').Util;
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { JobinfoStatus } = require('../../util/constants');

class JobinfoService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Jobinfo;
  }

  async create({ corpid }, { title, content, city, expiredAt }) {
    // TODO: coreid和corpname应该从token中获取，此处暂时由参数传入
    assert(corpid, '企业ID不能为空');
    // 检查数据
    assert(title, 'title不能为空');
    assert(content, 'content不能为空');
    assert(city, 'city不能为空');
    assert(_.isUndefined(expiredAt) || _.isDate(expiredAt), 'expiredAt必须是Date对象');

    // TODO: 查询企业信息
    let corp = await this.service.axios.corp.fetch({ corpid });
    if (!corp) {
      throw new BusinessError(ErrorCode.USER_NOT_EXIST, '企业信息不存在');
    }
    corp = { corpid, corpname: corp.corpname };

    if (_.isUndefined(expiredAt)) {
      expiredAt = moment().add(15, 'days').toDate();
    }
    // TODO:保存数据
    const res = await this.model.create({ title, content, city, ...corp, status: JobinfoStatus.PENDING, unit: this.tenant, expiredAt });
    return res;
  }

  async update({ id, corpid }, { title, content, city, expiredAt }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(corpid, '企业ID不能为空');
    // 检查数据
    assert(id, 'id不能为空');
    assert(_.isUndefined(expiredAt) || _.isDate(expiredAt), 'expiredAt必须是Date对象');

    // TODO:检查数据是否存在
    const entity = await this.model.findOne({ _id: ObjectId(id), corpid }).exec();
    if (isNullOrUndefined(entity)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST);
    }
    // TODO:检查数据状态
    if (entity.status === JobinfoStatus.NORMAL) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '数据无法修改');
    }

    // TODO:保存数据
    const res = await this.model.findByIdAndUpdate(id, trimData({ title, content, city, expiredAt }), { new: true }).exec();
    return res;
  }


}

module.exports = JobinfoService;
