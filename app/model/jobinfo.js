/**
 * 招聘信息
 */
'use strict';
const Schema = require('mongoose').Schema;
const { CodeNamePair } = require('naf-framework-mongoose/lib/model/schema');
const metaPlugin = require('naf-framework-mongoose/lib/model/meta-plugin');

// 校园招聘信息
const SchemaDefine = {
  corpid: { type: String, required: false, maxLength: 64 }, // 企业ID，如果非注册企业可为空，注册企业不能为空
  corpname: { type: String, required: true, maxLength: 128 }, // 企业名称
  status: { type: String, default: '1', maxLength: 64 }, // 状态: 0-正常(审核通过)；1-申请发布；2-审核失败
  title: { type: String, required: true, maxLength: 128 }, // 标题
  content: { type: String, required: true, maxLength: 10240, select: false }, // 详情
  city: CodeNamePair, // 工作城市
  count: { type: String, maxLength: 64 }, // 需求人数
  jobdesc: { type: String, maxLength: 200 }, // 职位描述
  jobcat: CodeNamePair, // 职位类别：
  nature: CodeNamePair, // 工作性质: 全职、实习、其他
  salary: CodeNamePair, // 工作待遇
  xlreqs: CodeNamePair, // 学历要求
  zyreqs: { type: String, maxLength: 200 }, // 专业要求
  date: { type: String, required: false }, // 发布日期，格式：YYYY-MM-DD
  expired: { type: String, required: false }, // 信息失效时间，格式：YYYY-MM-DD
  unit: { type: String, required: true }, // 发布单位（学校代码）
  remark: { type: String, maxLength: 500 } // 备注

};
const schema = new Schema(SchemaDefine, { 'multi-tenancy': true, toJSON: { virtuals: true } });
schema.index({ status: 1 });
schema.index({ 'corp._id': 1 });
schema.plugin(metaPlugin);

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('Jobinfo', schema, 'jobs_jobinfo');
};
