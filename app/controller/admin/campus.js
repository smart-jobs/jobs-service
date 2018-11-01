'use strict';
/**
 * 校园招聘会
 */
const meta = require('./.campus.js');
const { Controller } = require('egg');
const { CrudController } = require('naf-framework-mongoose/lib/controller');

class CampusTalkController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.admin.campus;
  }
}

module.exports = CrudController(CampusTalkController, meta);
