'use strict';
/**
 * 校园招聘会
 */
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const meta = require('./.jobfair_corp.js');
const { Controller } = require('egg');
const { CrudController } = require('naf-framework-mongoose/lib/controller');

class JobfairCorpController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.admin.jobfairCorp;
  }

  async export() {
    const { fair_id, status } = this.ctx.query;

    const res = await this.service.export({ fair_id, status });
    this.ctx.set('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    this.ctx.set('content-disposition', 'attachment;filename=' + res.name);
    this.ctx.body = fs.createReadStream(path.join(res.dir, res.name));
  }

}

module.exports = CrudController(JobfairCorpController, meta);
