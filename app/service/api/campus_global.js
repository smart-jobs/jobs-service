'use strict';

const { CrudService } = require('naf-framework-mongoose/lib/service');

class CampusTalkGlobalService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.app.model.Campus;
  }
}

module.exports = CampusTalkGlobalService;
