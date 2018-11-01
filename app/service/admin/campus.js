'use strict';

const { CrudService } = require('naf-framework-mongoose/lib/service');

class CampusService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Campus;
  }

}

module.exports = CampusService;
