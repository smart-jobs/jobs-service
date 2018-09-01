'use strict';
const Schema = require('mongoose').Schema;

// 代码
const codeSchema = new Schema({
  code: { type: String, required: true, maxLength: 64 },
  name: String,
}, { _id: false });

// 校园招聘信息
const SchemaDefine = {
  tenant: { type: String, required: true, maxLength: 64 }, // 分站ID
  status: { type: String, default: '1', maxLength: 64 }, // 状态: 0-正常(审核通过)；1-申请发布；2-审核失败
  title: { type: String, require: true, maxLength: 128 }, // 标题
  content: { type: String, require: true, maxLength: 10240 }, // 详情
  corp: {
    id: String,
    name: String,
  },
  city: codeSchema,
  meta: {
    state: {// 数据状态
      type: Number,
      default: 0, // 0-正常；1-标记删除
    },
    comment: String,
  }
};
const schema = new Schema(SchemaDefine, { 'multi-tenancy': true, timestamps: { createdAt: 'meta.createdAt', updatedAt: 'meta.updatedAt' } });
schema.index({ status: 1 });
schema.index({ 'corp._id': 1 });

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('Jobinfo', schema, 'jobs_jobinfo');
};
