/**
 * 招聘会
 */
'use strict';
const Schema = require('mongoose').Schema;
const { CodeNamePair } = require('naf-framework-mongoose/lib/model/schema');
const metaPlugin = require('naf-framework-mongoose/lib/model/meta-plugin');

// 招聘会限制信息
const LimitSchema = new Schema({
  count: Number, // 外校学生普通票数量限制
  time: String, // 临时票时间限制，格式"HH:mm:ss"
}, { _id: false });

// 校园招聘会信息
const SchemaDefine = {
  status: { type: String, default: '0', maxLength: 64 }, // 状态: 0-开放申请；1-关闭申请；2-进行中；
  subject: { type: String, required: true, maxLength: 128 }, // 标题
  content: { type: String, required: true, maxLength: 102400, select: false }, // 详情
  type: { type: String, required: true, maxLength: 64 }, // 招聘会类型
  city: CodeNamePair, // 举办城市
  address: { type: String, required: true, maxLength: 128 }, // 举办地址
  time: { type: String, required: true, maxLength: 64 }, // 举办时间
  date: { type: String, required: true }, // 举办日期，格式：YYYY-MM-DD
  unit: { type: String, required: true }, // 举办单位（学校代码）
  limit: { // 招聘会限制信息
    type: LimitSchema,
    select: true,
  },
  secret: { // 验证口令
    type: String,
    select: false,
  },
  external: { type: Number, default: 0 }, // 是否外部信息: 0-企业申请、1-系统发布
};
const schema = new Schema(SchemaDefine, { 'multi-tenancy': true, toJSON: { virtuals: true } });
schema.index({ status: 1 });
schema.plugin(metaPlugin);

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('Jobfair', schema, 'jobs_jobfair');
};
