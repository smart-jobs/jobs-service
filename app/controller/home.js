'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');

class HomeController extends Controller {
  async index() {
    this.ctx.body = '请通过服务接口进行调用';
  }

  async test() {
    // console.log(_.get(this.ctx.service, 'api.jobfairGlobal'));
    // this.ctx.body = '请通过服务接口进行调用';
    this.ctx.body = this.ctx.query;
    console.log(_.get(this.ctx.query, 'corp.id'));
    const data = { corp: { id: 1, name: 'aaa' } };
    console.log(_.get(data, 'corp.id'));

  }
}

module.exports = HomeController;
