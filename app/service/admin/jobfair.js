'use strict';

const { CrudService } = require('naf-framework-mongoose/lib/service');

class JobinfoService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Jobfair;
  }

}

module.exports = JobinfoService;
