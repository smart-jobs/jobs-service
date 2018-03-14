'use strict';
const Schema = require('mongoose').Schema;

// 代码
const codeSchema = new Schema({
  code: { type: String, required: true, maxLength: 64 },
  name: String,
}, { _id: false });

// 参展企业信息
const corpInfoSchema = new Schema({
  id: { type: String, required: false, maxLength: 64 },
  name: { type: String, required: true, maxLength: 128 },
  // 职位列表
  jobs: [{
    name: String, // 职位名称
    count: Number, // 职位数量
    requirement: String, // 需求专业
  }],
  // 审核状态: 0-审核通过、1-未审核、2-审核失败
  status: { type: String, required: true, maxLength: 64, default: '0' },
}, { timestamps: true });
corpInfoSchema.index({ name: 1 });
corpInfoSchema.index({ name: 1, status: 1 });

// 校园招聘会信息
const SchemaDefine = {
  tenant: { type: String, required: true, maxLength: 64 }, // 分站ID
  status: { type: String, default: '0', maxLength: 64 }, // 状态: 0-正常(审核通过)；1-申请发布；2-审核失败
  title: { type: String, require: true, maxLength: 128 }, // 标题
  content: { type: String, require: true, maxLength: 10240 }, // 详情
  type: { type: String, required: true, maxLength: 64 }, // 招聘会类型
  city: codeSchema, // 举办城市
  address: { type: String, require: true, maxLength: 128 }, // 举办地址
  time: { type: String, require: true, maxLength: 64 }, // 举办时间
  corps: [ corpInfoSchema ], // 参展企业
  meta: {
    state: {// 数据状态
      type: Number,
      default: 0, // 0-正常；1-标记删除
    },
    comment: String,
  }
};
const schema = new Schema(SchemaDefine, { timestamps: { createdAt: 'meta.createdAt', updatedAt: 'meta.updatedAt' } });
schema.index({ tenant: 1 });
schema.index({ tenant: 1, status: 1 });
schema.index({ tenant: 1, 'corps.name': 1 });
schema.index({ tenant: 1, 'corps.name': 1, 'corps.status': 1 });

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('Jobfair', schema, 'jobs_jobfair');
};
