'use strict';

const { CrudService } = require('naf-framework-mongoose/lib/service');

class ResumeService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Resume;
  }

}

module.exports = ResumeService;
