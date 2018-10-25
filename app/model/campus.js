/**
 * 企业校园宣讲会
 */
'use strict';
const Schema = require('mongoose').Schema;
const { CodeNamePair } = require('naf-framework-mongoose/lib/model/schema');
const metaPlugin = require('naf-framework-mongoose/lib/model/meta-plugin');

// 职位信息
const jobInfoSchema = new Schema({
  name: { type: String, required: true, maxLength: 128 }, // 职位名称
  count: { type: String, required: true, maxLength: 128 }, // 职位数量
  requirement: { type: String, required: true, maxLength: 1024 }, // 需求专业
});

// 校园宣讲会信息
const SchemaDefine = {
  status: { type: String, default: '0', maxLength: 64 }, // 状态: 0-正常(审核通过)；1-申请发布；2-审核失败
  subject: { type: String, required: true, maxLength: 128 }, // 标题
  content: { type: String, required: true, maxLength: 10240 }, // 详情
  corp: {
    id: String,
    name: String,
  },
  city: CodeNamePair, // 宣讲城市
  address: { type: String, required: true, maxLength: 128, default: '' }, // 宣讲地址
  school: { type: String, required: true, maxLength: 64 }, // 宣讲学校
  time: { type: String, required: true, maxLength: 64 }, // 举办时间说明
  contact: { type: String, required: true, maxLength: 64 }, // 招聘联系电话
  email: { type: String, required: true, maxLength: 128 }, // 简历投递邮箱
  jobs: [ jobInfoSchema ], // 职位列表
  date: { type: String, required: true }, // 举办日期，格式：YYYY-MM-DD
  unit: { type: String, required: true }, // 举办单位（学校代码）
};
const schema = new Schema(SchemaDefine, { 'multi-tenancy': true });
schema.index({ status: 1 });
schema.index({ 'corp._id': 1 });
schema.plugin(metaPlugin);

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('Campustalk', schema, 'jobs_campustalk');
};
