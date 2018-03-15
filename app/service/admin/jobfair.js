'use strict';

const assert = require('assert');
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { isNullOrUndefined } = require('naf-core').Util;
const { CrudService } = require('naf-framework-mongoose').Services;
const { JobfairStatus, JobfairCorpStatus } = require('../../util/constants');

class JobinfoService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.mFair = this._model(ctx.model.Jobfair);
    this.model = this.mFair.model;
  }

}

module.exports = JobinfoService;
