'use strict';
/**
 * 校园招聘会
 */
const meta = require('./.jobfair_corp.js');
const { Controller } = require('egg');
const { CrudController } = require('naf-framework-mongoose/lib/controller');

class JobfairTicketController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.admin.jobfairTicket;
  }
}

module.exports = CrudController(JobfairTicketController, meta);
