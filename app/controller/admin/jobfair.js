'use strict';
/**
 * 校园招聘会
 */
const meta = require('./jobfair.json');
const { CrudController, NafController } = require('naf-framework-mongoose').Controllers;

class JobfairController extends NafController {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.api.jobfair;
  }
}

module.exports = CrudController(JobfairController, meta);
