'use strict';
/**
 * 校园宣讲会
 */
const meta = require('./.campus.js');
const { Controller } = require('egg');
const { CrudController } = require('naf-framework-mongoose/lib/controller');

class CampusTalkController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.api.campus;
  }
}

module.exports = CrudController(CampusTalkController, meta);
