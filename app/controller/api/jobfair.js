'use strict';
/**
 * 校园招聘会
 */
const meta = require('./.jobfair.js');
const { Controller } = require('egg');
const { CrudController } = require('naf-framework-mongoose/lib/controller');
const moment = require('moment');

class JobfairController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.api.jobfair;
  }

  // 查询当天招聘会简要信息列表
  async today() {
    const date = moment().format('L'); // ex. 2018-10-24
    const { jobfairGlobal: service } = this.ctx.servcie.api;
    const rs = await service.query({ date }, { projection: { unit: 1, subject: 1 } });
    this.ctx.ok({ data: rs });
  }
}

module.exports = CrudController(JobfairController, meta);
