'use strict';

const assert = require('assert');
const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { LetterStatus } = require('../../util/constants');

class LetterService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Letter;
  }

  async reply({ id, 'corp.id': corp_id }, { status, reply }) {
    // TODO: coreid应该从token中获取，此处暂时由参数传入
    assert(corp_id, '企业ID不能为空');
    // 检查数据
    assert(id, 'id不能为空');
    assert(status === LetterStatus.ACCEPT || status === LetterStatus.REJECT, 'status无效');

    // TODO:检查数据是否存在
    const entity = await this.model.findOne({ _id: ObjectId(id), 'corp.id': corp_id }).exec();
    if (!entity) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST);
    }
    // TODO:检查数据状态
    if (entity.status === LetterStatus.ACCEPT || entity.status === status) {
      throw new BusinessError(ErrorCode.DATA_INVALID, '数据无法修改');
    }

    // TODO:保存数据
    entity.status = status;
    entity.reply = reply;
    await entity.save();

    return entity;
  }

}

module.exports = LetterService;
