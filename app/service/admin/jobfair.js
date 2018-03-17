'use strict';

const { CrudService } = require('naf-framework-mongoose').Services;

class JobinfoService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.mFair = this._model(ctx.model.Jobfair);
    this.model = this.mFair.model;
  }

}

module.exports = JobinfoService;
