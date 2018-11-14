/**
 * 招聘信息
 */
'use strict';
const Schema = require('mongoose').Schema;
const { CodeNamePair } = require('naf-framework-mongoose/lib/model/schema');
const metaPlugin = require('naf-framework-mongoose/lib/model/meta-plugin');

// 校园招聘信息
const SchemaDefine = {
  infoid: { type: String, required: false, maxLength: 64 }, // 招聘信息ID
  city: CodeNamePair, // 工作城市
  xqrs: { type: String, maxLength: 64 }, // 需求人数
  gzlx: { type: String, maxLength: 64 }, // 工作类型
  zwlb: { type: String, maxLength: 64 }, // 职位类别
  gzdy: { type: String, maxLength: 64 }, // 工作待遇
  zwms: { type: String, maxLength: 64 }, // 职位描述
  wyyz: { type: String, maxLength: 64 }, // 外语语种
  xlzy: [{
    xl: { type: String, maxLength: 64 }, // 学历
    zy: { type: String, maxLength: 64 }, // 专业
  }],
  remark: { type: String, maxLength: 500 } // 备注

};
const schema = new Schema(SchemaDefine, { 'multi-tenancy': true });
schema.index({ status: 1 });
schema.index({ 'corp._id': 1 });
schema.plugin(metaPlugin);

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('JobinfoPosition', schema, 'jobs_jobinfo_position');
};
