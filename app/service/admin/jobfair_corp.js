'use strict';

const assert = require('assert');
const _ = require('lodash');
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { isNullOrUndefined } = require('naf-core').Util;
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { JobfairCorpStatus } = require('../../util/constants');

class JobfairCorpService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.JobfairCorp;
  }

  // 审核申请
  async review({ id }, { status, booth, remark }) {
    // console.log(params);
    assert(id, 'id不能为空');
    assert(!isNullOrUndefined(status), 'status不能为空');
    assert(status === JobfairCorpStatus.NORMAL || status === JobfairCorpStatus.REJECT, 'status无效');
    assert(status !== JobfairCorpStatus.NORMAL || !isNullOrUndefined(booth), 'booth无效');


    // 查询数据
    const entity = await this.model.findById(id).exec();
    if (isNullOrUndefined(entity)) throw new BusinessError(ErrorCode.DATA_NOT_EXIST);
    if (entity.status !== JobfairCorpStatus.PENDING && entity.status !== JobfairCorpStatus.REJECT) {
      throw new BusinessError(ErrorCode.SERVICE_FAULT, '数据状态无效');
    }

    // TODO: 保存数据
    entity.status = status;
    entity.booth = booth;
    entity.remark = remark;
    await entity.save();

    return entity;
  }

}

module.exports = JobfairCorpService;
