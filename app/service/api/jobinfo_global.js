'use strict';

const { CrudService } = require('naf-framework-mongoose/lib/service');

class JobinfoGlobalService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.app.model.Jobinfo;
  }
}

module.exports = JobinfoGlobalService;
