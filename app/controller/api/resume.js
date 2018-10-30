'use strict';
/**
 * 简历模板
 */
const meta = require('./.resume.js');
const { Controller } = require('egg');
const { CrudController } = require('naf-framework-mongoose/lib/controller');

class ResumeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.api.jobinfo;
  }
}

module.exports = CrudController(ResumeController, meta);
