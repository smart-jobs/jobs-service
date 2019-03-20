'use strict';
/**
 * 校园招聘会
 */
const meta = require('./.jobfair_corp.js');
const { Controller } = require('egg');
const { CrudController } = require('naf-framework-mongoose/lib/controller');

class JobfairCorpController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.admin.jobfairCorp;
  }
}

module.exports = CrudController(JobfairCorpController, meta);
