'use strict';

const assert = require('assert');
const _ = require('lodash');
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { isNullOrUndefined } = require('naf-core').Util;
const { JobfairStatus } = require('../../util/constants');

class JobfairService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Jobfair;
  }

  async create({ type, subject, content, city, address, date, time }) {
    // 检查数据
    assert(type, '招聘会类型不能为空');
    assert(subject, 'subject不能为空');
    assert(content, 'content不能为空');
    assert(address, 'address不能为空');
    assert(date, 'date不能为空');
    assert(time, 'time不能为空');
    assert(isNullOrUndefined(city) || _.isObject(city), 'city必须是字典对象');

    // TODO:保存数据
    const data = {
      type, subject, content, city, address, time, date,
      status: JobfairStatus.OPENING, unit: this.tenant
    };

    const res = await this.model.create(data);
    return res;
  }

}

module.exports = JobfairService;
