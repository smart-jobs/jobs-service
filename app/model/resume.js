/**
 * 简历模板
 */
'use strict';
const Schema = require('mongoose').Schema;
const metaPlugin = require('naf-framework-mongoose/lib/model/meta-plugin');

// 简历模板信息
const SchemaDefine = {
  userid: { type: String, require: true }, // 用户ID
  title: { type: String, required: true, maxLength: 128 }, // 模板标题
  content: { type: String, required: true, maxLength: 102400, select: false }, // 模板内容
  info: { // 基本信息
    xm: String, // 姓名
    xb: String, // 性别
    csrq: String, // 出生日期
    xl: String, // 学历
    yxmc: String, // 毕业院校
    zymc: String, // 专业名称
  },
  contact: { // 联系方式
    mobile: String, // 手机号
    email: String, // 电子邮件
  },
};
const schema = new Schema(SchemaDefine, { 'multi-tenancy': false });
schema.index({ userid: 1 });
schema.plugin(metaPlugin);

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('Resume', schema, 'jobs_resume');
};
