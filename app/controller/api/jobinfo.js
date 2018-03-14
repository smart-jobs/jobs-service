'use strict';
/**
 * 校园招聘信息
 */
const meta = require('./jobinfo.json');
const { CrudController, NafController } = require('naf-framework-mongoose').Controllers;

class JobinfoController extends NafController {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.api.jobinfo;
  }
}

module.exports = CrudController(JobinfoController, meta);
