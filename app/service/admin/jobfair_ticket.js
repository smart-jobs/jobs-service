'use strict';

const _ = require('lodash');
const { CrudService } = require('naf-framework-mongoose/lib/service');

class JobfairTicketService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.JobfairTicket;
  }

}

module.exports = JobfairTicketService;
