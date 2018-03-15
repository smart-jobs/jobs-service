'use strict';
/**
 * 校园宣讲会
 */
const meta = require('./campus.json');
const { CrudController, NafController } = require('naf-framework-mongoose').Controllers;

class CampusTalkController extends NafController {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.api.campus;
  }
}

module.exports = CrudController(CampusTalkController, meta);
