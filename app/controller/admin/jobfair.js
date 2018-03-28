'use strict';
/**
 * 校园招聘会
 */
const meta = require('./jobfair.json');
const { Controller } = require('egg');
const { CrudController } = require('naf-framework-mongoose').Controllers;

class JobfairController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.api.jobfair;
  }
}

module.exports = CrudController(JobfairController, meta);
