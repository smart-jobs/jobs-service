'use strict';
/**
 * 校园宣讲会
 */
const assert = require('assert');
const meta = require('./.campus.js');
const { Controller } = require('egg');
const { CrudController } = require('naf-framework-mongoose/lib/controller');

class CampusTalkController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.api.campus;
  }

  // 查询分站指定月份宣讲会简要信息列表
  async calendar() {
    const { month } = this.ctx.query; // ex. 2019-03
    assert(/^\d{4}-\d{2}$/.test(month), 'month参数无效');
    const rs = await this.service.query({ date: new RegExp(`^${month}`) }, { projection: { unit: 1, subject: 1, date: 1 } });
    this.ctx.ok({ data: rs });
  }
}

module.exports = CrudController(CampusTalkController, meta);
