'use strict';

const assert = require('assert');
const _ = require('lodash');
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { isNullOrUndefined } = require('naf-core').Util;
const { JobfairStatus, JobfairCorpStatus, CheckinStatus, TicketStatus } = require('../../util/constants');

class JobfairService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Jobfair;
    this.mCorp = this.app.model.JobfairCorp;
    this.mTicket = this.app.model.JobfairTicket;
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

  // 统计招聘会参会企业情况
  async corp_count({ fair_id }) {
    assert(fair_id, '招聘会ID不能为空');

    // TODO: 统计数据
    const total = await this.mCorp.count({ fair_id }).exec();
    const approved = await this.mCorp.count({ fair_id, status: JobfairCorpStatus.NORMAL }).exec();
    const checked = await this.mCorp.count({ fair_id, 'checkin.status': CheckinStatus.FINISH }).exec();

    // TODO: 转换输出数据格式
    return { total, approved, checked };
  }

  // 统计招聘会入场券情况
  async ticket_count({ fair_id }) {
    assert(fair_id, '招聘会ID不能为空');

    // TODO: 统计数据
    const total = await this.mTicket.count({ fair_id }).exec();
    const verified = await this.mTicket.count({ fair_id, 'verify.status': TicketStatus.USED }).exec();

    // TODO: 转换输出数据格式
    return { total, verified };
  }
}

module.exports = JobfairService;
