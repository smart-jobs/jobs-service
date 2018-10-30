/**
 * 求职信
 */
'use strict';
const Schema = require('mongoose').Schema;
const metaPlugin = require('naf-framework-mongoose/lib/model/meta-plugin');

// 求职信信息
const SchemaDefine = {
  userid: { type: String, require: true }, // 用户ID
  title: { type: String, required: true, maxLength: 128 }, // 职位标题
  content: { type: String, required: true, maxLength: 102400, select: false }, // 简历内容
  reply: { type: String, required: true, maxLength: 102400, select: false }, // 回复内容
  status: { type: String, default: '0' }, // 接受: 0-新投递，未接收；1-已接收；2-已回复
  type: { type: String, default: '0' }, // 求职信类型：0-招聘信息；1-招聘会；
  origin: { type: String, require: true }, // 信息来源ID：招聘信息ID、招聘会ID
  corp: {
    id: String, // 企业ID
    name: String, // 企业名称
  },
  info: { // 学生基本信息
    xm: String, // 姓名
    xb: String, // 性别
    xl: String, // 学历
    yxmc: String, // 毕业院校
    zymc: String, // 专业名称
  },
  contact: { // 联系方式
    mobile: String, // 手机号
    email: String, // 电子邮件
  },
};
const schema = new Schema(SchemaDefine, { 'multi-tenancy': true });
schema.index({ status: 1 });
schema.index({ userid: 1 });
schema.index({ 'corp.id': 1 });
schema.index({ 'corp.id': 1, type: 1 });
schema.index({ 'corp.id': 1, origin: 1 });
schema.index({ 'corp.id': 1, userid: 1, origin: 1 });
schema.plugin(metaPlugin);

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('Letter', schema, 'jobs_letter');
};
