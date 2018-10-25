/**
 * 招聘会参展企业信息
 */
'use strict';
const Schema = require('mongoose').Schema;
const metaPlugin = require('naf-framework-mongoose/lib/model/meta-plugin');

// 职位信息
const jobSchema = new Schema({
  name: { type: String, required: true, maxLength: 128 }, // 职位名称
  count: Number, // 招聘人数
  requirement: String, // 需求说明
});

// 校园招聘会参展企业信息
const SchemaDefine = {
  id: { type: String, required: true, maxLength: 64 }, // 招聘会ID
  corp: {
    id: String, // 企业ID，如果非注册企业可为空，注册企业不能为空
    name: String, // 企业名称
  },
  // 职位列表
  jobs: {
    type: [ jobSchema ],
    default: [],
  },
  // 审核状态: 0-审核通过、1-未审核、2-审核失败
  status: { type: String, required: true, maxLength: 64, default: '0' },
};
const schema = new Schema(SchemaDefine, { 'multi-tenancy': true });
schema.index({ id: 1 });
schema.index({ id: 1, status: 1 });
schema.index({ 'corp.id': 1 });
schema.plugin(metaPlugin);

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('JobfairCorp', schema, 'jobs_jobfair_corp');
};
