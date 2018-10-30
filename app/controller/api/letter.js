'use strict';
/**
 * 简历模板
 */
const meta = require('./.letter.js');
const { Controller } = require('egg');
const { CrudController } = require('naf-framework-mongoose/lib/controller');

class LetterController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.api.jobinfo;
  }
}

module.exports = CrudController(LetterController, meta);
