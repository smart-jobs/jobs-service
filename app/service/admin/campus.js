'use strict';

const assert = require('assert');
const _ = require('lodash');
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { isNullOrUndefined } = require('naf-core').Util;
const { CampusTalkStatus } = require('../../util/constants');

class CampusService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Campus;
  }

  // 审核申请
  async review({ id }, { status }) {
    // console.log(params);
    assert(id, 'id不能为空');
    assert(!isNullOrUndefined(status), 'status不能为空');
    assert(status === CampusTalkStatus.NORMAL || status === CampusTalkStatus.REJECT, 'status无效');

    // 查询数据
    const entity = await this.model.findById(id).exec();
    if (isNullOrUndefined(entity)) throw new BusinessError(ErrorCode.DATA_NOT_EXIST);
    if (entity.status !== CampusTalkStatus.PENDING && entity.status !== CampusTalkStatus.REJECT) {
      throw new BusinessError(ErrorCode.SERVICE_FAULT, '数据状态无效');
    }

    // TODO: 保存数据
    entity.status = status;
    entity.unit = this.tenant;
    await entity.save();

    return entity;
  }

  async create({ corpid, corpname, subject, content, address, date, time, contact, email, jobs }) {
    // TODO: coreid和corpname应该从token中获取，此处暂时由参数传入
    assert(corpname, '宣讲企业不能为空');
    // 检查数据
    assert(subject, 'subject不能为空');
    assert(content, 'content不能为空');
    assert(time, 'time不能为空');
    assert(contact, 'contact不能为空');
    assert(email, 'email不能为空');
    assert(date, 'date不能为空');
    assert(_.isArray(jobs), 'jobs必须是一个对象数组');

    // TODO: 查询企业信息
    if (corpid) {
      const corp = await this.service.axios.corp.fetch({ corpid });
      if (!corp) {
        throw new BusinessError(ErrorCode.USER_NOT_EXIST, '企业信息不存在');
      }
      corpname = corp.name;
    }

    // TODO:保存数据
    const data = {
      subject, content, corpid, corpname, status: CampusTalkStatus.PENDING,
      address, time, contact, email, jobs, date, unit: this.tenant
    };

    const res = await this.model.create(data);
    return res;
  }

}

module.exports = CampusService;
