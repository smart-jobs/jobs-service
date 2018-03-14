'use strict';
/**
 * 招聘会
 */
const Controller = require('egg').Controller;

class JobfairController extends Controller {
  async index() {
    this.ctx.body = '请通过服务接口进行调用';
  }
  async list() {
    this.ctx.body = 'no implements！';
  }
}

module.exports = JobfairController;
