'use strict';

const assert = require('assert');
const _ = require('lodash');
const moment = require('moment');
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { isNullOrUndefined } = require('naf-core').Util;
const { JobinfoStatus } = require('../../util/constants');

class JobinfoService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Jobinfo;
  }

  // 审核申请
  async review({ id }, { status }) {
    // console.log(params);
    assert(id, 'id不能为空');
    assert(!isNullOrUndefined(status), 'status不能为空');
    assert(status === JobinfoStatus.NORMAL || status === JobinfoStatus.REJECT, 'status无效');

    // 查询数据
    const entity = await this.model.findById(id).exec();
    if (isNullOrUndefined(entity)) throw new BusinessError(ErrorCode.DATA_NOT_EXIST);
    if (entity.status !== JobinfoStatus.PENDING && entity.status !== JobinfoStatus.REJECT) {
      throw new BusinessError(ErrorCode.SERVICE_FAULT, '数据状态无效');
    }

    // TODO: 保存数据
    entity.status = status;
    entity.unit = this.tenant;
    if (status === JobinfoStatus.NORMAL) {
      entity.date = moment().format('YYYY-MM-DD');
    }
    await entity.save();

    return entity;
  }

  async create({ corpid, corpname, title, content, city, date, expired,
    count, jobdesc, jobcat, nature, salary, xlreqs, zyreqs }) {
    // TODO: coreid和corpname应该从token中获取，此处暂时由参数传入
    assert(corpname, '招聘企业不能为空');
    // 检查数据
    assert(title, 'title不能为空');
    assert(content, 'content不能为空');
    assert(isNullOrUndefined(city) || _.isObject(city), 'city必须是字典对象');
    assert(isNullOrUndefined(expired) || _.isString(expired), 'expired必须是字符串');
    assert(isNullOrUndefined(count) || _.isString(count), 'count必须是字符串');
    assert(isNullOrUndefined(jobcat) || _.isObject(jobcat), 'jobcat必须是字典对象');
    assert(isNullOrUndefined(nature) || _.isObject(nature), 'nature必须是字典对象');
    assert(isNullOrUndefined(salary) || _.isObject(salary), 'salary必须是字典对象');
    assert(isNullOrUndefined(xlreqs) || _.isObject(xlreqs), 'xlreqs必须是字典对象');
    assert(isNullOrUndefined(zyreqs) || _.isString(zyreqs), 'zyreqs必须是字符串');

    // TODO: 查询企业信息
    if (corpid) {
      const corp = await this.service.axios.corp.fetch({ corpid });
      if (!corp) {
        throw new BusinessError(ErrorCode.USER_NOT_EXIST, '企业信息不存在');
      }
      corpname = corp.name;
    }

    if (_.isUndefined(expired)) {
      expired = moment().add(15, 'days').format('YYYY-MM-DD');
    }
    if (_.isUndefined(date)) {
      date = moment().format('YYYY-MM-DD');
    }
    // TODO:保存数据
    const res = await this.model.create({
      title, content, city, corpid, corpname, status: JobinfoStatus.PENDING, unit: this.tenant,
      expired, count, jobdesc, jobcat, nature, salary, xlreqs, zyreqs
    });
    return res;
  }

}

module.exports = JobinfoService;
