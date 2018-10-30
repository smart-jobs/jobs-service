'use strict';

const assert = require('assert');
const _ = require('lodash');
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { BusinessError, ErrorCode } = require('naf-core').Error;

class ResumeService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Resume;
  }

  async create({ userid }, { title, content, info, contact }) {
    // 检查数据
    assert(userid, '用户ID不能为空');
    assert(title, 'title不能为空');
    assert(content, 'content不能为空');
    assert(_.isObject(info), 'info必须是个对象');
    assert(_.isObject(contact), 'contact必须是个对象');

    const { csrq, xl, yxmc, zymc } = info;
    assert(csrq, 'info.csrq不能为空');
    assert(xl, 'info.xl不能为空');
    assert(yxmc, 'info.yxmc不能为空');
    assert(zymc, 'info.zymc不能为空');

    const { mobile, email } = contact;
    assert(mobile, 'contact.mobile不能为空');
    assert(email, 'contact.email不能为空');

    // TODO: 查询用户信息
    const user = await this.service.axios.user.fetch({ id: userid });
    if (!user) {
      throw new BusinessError(ErrorCode.USER_NOT_EXIST, '用户信息不存在');
    }
    const { xm, xb } = user;

    // TODO:保存数据
    const res = await this.model.create({
      userid, title, content,
      info: { ...info, xm, xb },
      contact });
    return res;
  }

}

module.exports = ResumeService;
