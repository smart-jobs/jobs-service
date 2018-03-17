'use strict';
const Schema = require('mongoose').Schema;

// 代码
const codeSchema = new Schema({
  code: { type: String, required: true, maxLength: 64 },
  name: String,
}, { _id: false });

// 职位信息
const jobInfoSchema = new Schema({
  name: { type: String, required: true, maxLength: 128 }, // 职位名称
  count: { type: String, required: true, maxLength: 128 }, // 职位数量
  requirement: { type: String, required: true, maxLength: 1024 }, // 需求专业
});

// 校园宣讲会信息
const SchemaDefine = {
  tenant: { type: String, required: true, maxLength: 64 }, // 分站ID
  status: { type: String, default: '0', maxLength: 64 }, // 状态: 0-正常(审核通过)；1-申请发布；2-审核失败
  subject: { type: String, require: true, maxLength: 128 }, // 标题
  content: { type: String, require: true, maxLength: 10240 }, // 详情
  corp: {
    id: String,
    name: String,
  },
  city: codeSchema, // 宣讲城市
  address: { type: String, require: true, maxLength: 128, default: '' }, // 宣讲地址
  school: { type: String, require: true, maxLength: 64 }, // 宣讲学校
  time: { type: String, require: true, maxLength: 64 }, // 举办时间
  contact: { type: String, require: true, maxLength: 64 }, // 招聘联系电话
  email: { type: String, require: true, maxLength: 128 }, // 简历投递邮箱
  jobs: [ jobInfoSchema ], // 职位列表
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
schema.index({ tenant: 1, 'corp._id': 1 });

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('Campustalk', schema, 'jobs_campustalk');
};
