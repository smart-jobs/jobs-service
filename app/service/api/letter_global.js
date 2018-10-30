'use strict';

const assert = require('assert');
const _ = require('lodash');
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { BusinessError, ErrorCode } = require('naf-core').Error;

class LetterGlobalService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.app.model.Letter;
  }

  // 学生投递求职信
  async deliver({ userid }, { corpid, resumeid, type, origin }) {
    assert(userid, '用户ID不能为空');
    assert(corpid, '企业ID不能为空');
    assert(resumeid, '简历ID不能为空');
    assert(_.isString(type) && type, 'type不能为空');
    assert(_.isString(origin) && origin, 'origin不能为空');

    // TODO: 检查就业信息来源
    let job;
    if (type === '0') {
      job = await this.service.api.jobfairGlobal.fetch({ id: origin });
    } else {
      job = await this.service.api.jobfairGlobal.fetch({ id: origin });
    }
    if (!job) {
      const typeName = type === '0' ? '招聘信息' : '招聘会信息';
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, `${typeName}不存在`);
    }

    // 使用招聘信息所在分站的租户信息
    job = job.toObject();
    console.log('job._tenant: ', job._tenant, job._id, job.__v);
    const model = this.app.tenantModel(job._tenant).Letter;

    // TODO: 检查简历信息
    const resume = await this.service.api.resume.fetch({ id: resumeid }, { projection: '+content' });
    if (!resume) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '简历信息不存在');
    }

    // TODO: 检查企业信息
    const corp = await this.service.axios.corp.fetch({ id: corpid });
    if (!corp) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '企业信息不存在');
    }

    // TODO: 检查数据是否存在
    let entity = await model.findOne({ userid, 'corp.id': corpid, origin });
    if (entity) {
      throw new BusinessError(ErrorCode.DATA_EXISTED, '不能重复投递求职信');
    }

    // TODO: 保存数据
    entity = await model.create({
      userid, type, origin,
      title: job.title || job.subject,
      corp: { id: corp._id, name: corp.corpname },
      content: resume.content,
      info: resume.info,
      contact: resume.contact,
    });

    return entity;
  }

}

module.exports = LetterGlobalService;
