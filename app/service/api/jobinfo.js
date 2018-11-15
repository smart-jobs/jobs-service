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

  async create({ corpid }, { title, content, city, expired,
    count, jobdesc, jobcat, nature, salary, xlreqs, zyreqs }) {
    // TODO: coreid和corpname应该从token中获取，此处暂时由参数传入
    assert(corpid, '企业ID不能为空');
    // 检查数据
    assert(title, 'title不能为空');
    assert(content, 'content不能为空');
    assert(city && _.isObject(city), 'city必须是字典对象');
    assert(isNullOrUndefined(expired) || _.isString(expired), 'expired必须是字符串');
    assert(isNullOrUndefined(count) || _.isString(count), 'count必须是字符串');
    assert(isNullOrUndefined(jobcat) || _.isObject(jobcat), 'jobcat必须是字典对象');
    assert(isNullOrUndefined(nature) || _.isObject(nature), 'nature必须是字典对象');
    assert(isNullOrUndefined(salary) || _.isObject(salary), 'salary必须是字典对象');
    assert(isNullOrUndefined(xlreqs) || _.isObject(xlreqs), 'xlreqs必须是字典对象');
    assert(isNullOrUndefined(zyreqs) || _.isString(zyreqs), 'zyreqs必须是字符串');

    // TODO: 查询企业信息
    let corp = await this.service.axios.corp.fetch({ corpid });
    if (!corp) {
      throw new BusinessError(ErrorCode.USER_NOT_EXIST, '企业信息不存在');
    }
    corp = { corpid, corpname: corp.corpname };

    if (_.isUndefined(expired)) {
      expired = moment().add(15, 'days').format('YYYY-MM-DD');
    }
    // TODO:保存数据
    const res = await this.model.create({ title, content, city, ...corp, status: JobinfoStatus.PENDING, unit: this.tenant,
      expired, count, jobdesc, jobcat, nature, salary, xlreqs, zyreqs });
    return res;
  }

  async update({ id, corpid }, { title, content, city, expired,
    count, jobdesc, jobcat, nature, salary, xlreqs, zyreqs }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(corpid, '企业ID不能为空');
    // 检查数据
    assert(id, 'id不能为空');
    assert(isNullOrUndefined(city) || _.isObject(city), 'city必须是字典对象');
    assert(isNullOrUndefined(expired) || _.isString(expired), 'expired必须是字符串');
    assert(isNullOrUndefined(count) || _.isString(count), 'count必须是字符串');
    assert(isNullOrUndefined(jobcat) || _.isObject(jobcat), 'jobcat必须是字典对象');
    assert(isNullOrUndefined(nature) || _.isObject(nature), 'nature必须是字典对象');
    assert(isNullOrUndefined(salary) || _.isObject(salary), 'salary必须是字典对象');
    assert(isNullOrUndefined(xlreqs) || _.isObject(xlreqs), 'xlreqs必须是字典对象');
    assert(isNullOrUndefined(zyreqs) || _.isString(zyreqs), 'zyreqs必须是字符串');

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
    const data = {
      title, content, city,
      expired, count, jobdesc, jobcat, nature, salary, xlreqs, zyreqs
    };

    const res = await this.model.findByIdAndUpdate(id, trimData(data), { new: true }).exec();
    return res;
  }


}

module.exports = JobinfoService;
