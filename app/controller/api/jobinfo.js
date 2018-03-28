'use strict';
/**
 * 校园招聘信息
 */
const meta = require('./jobinfo.json');
const { Controller } = require('egg');
const { CrudController } = require('naf-framework-mongoose').Controllers;

class JobinfoController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.api.jobinfo;
  }
}

module.exports = CrudController(JobinfoController, meta);
