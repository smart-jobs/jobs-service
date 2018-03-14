'use strict';
/**
 * 校园宣讲会
 */
const Controller = require('egg').Controller;

class CampusTalkController extends Controller {
  async index() {
    this.ctx.body = '请通过服务接口进行调用';
  }
}

module.exports = CampusTalkController;
