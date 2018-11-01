'use strict';

const assert = require('assert');
const _ = require('lodash');
const monent = require('moment');
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { isNullOrUndefined } = require('naf-core').Util;
const { JobinfoStatus } = require('../../util/constants');

class JobinfoService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Jobinfo;
  }

  // 审核申请
  async review({ id }, { status }) {
    // console.log(params);
    assert(id, 'id不能为空');
    assert(!isNullOrUndefined(status), 'status不能为空');
    assert(status === JobinfoStatus.NORMAL || status === JobinfoStatus.REJECT, 'status无效');

    // 查询数据
    const entity = await this.model.findById(id).exec();
    if (isNullOrUndefined(entity)) throw new BusinessError(ErrorCode.DATA_NOT_EXIST);
    if (entity.status !== JobinfoStatus.PENDING && entity.status !== JobinfoStatus.REJECT) {
      throw new BusinessError(ErrorCode.SERVICE_FAULT, '数据状态无效');
    }

    // TODO: 保存数据
    entity.status = status;
    entity.unit = this.tenant;
    if (status === JobinfoStatus.NORMAL) {
      entity.date = monent().format('YYYY-MM-DD');
    }
    await entity.save();

    return entity;
  }

}

module.exports = JobinfoService;
