/**
 * 招聘会参展企业信息
 */
'use strict';
const Schema = require('mongoose').Schema;
const metaPlugin = require('naf-framework-mongoose/lib/model/meta-plugin');

// 职位信息
const jobSchema = new Schema({
  name: { type: String, required: true, maxLength: 128 }, // 职位名称
  count: String, // 招聘人数
  requirement: String, // 需求说明
});

// 校园招聘会参展企业信息
const SchemaDefine = {
  corpid: { type: String, required: false, maxLength: 64 }, // 企业ID，如果非注册企业可为空，注册企业不能为空
  corpname: { type: String, required: true, maxLength: 128 }, // 企业名称
  description: { type: String, maxLength: 10240, select: false }, // 企业描述详情
  fair_id: { type: String, required: true, maxLength: 64 }, // 招聘会ID
  booth: { type: String, required: false, maxLength: 64 }, // 展位号
  // 职位列表
  jobs: {
    type: [ jobSchema ],
    default: [],
  },
  // 审核状态: 0-审核通过、1-未审核、2-审核失败
  status: { type: String, required: true, maxLength: 64, default: '0' },
  // 签到状态: 0-未签到、1-已签到
  checkin: {
    status: { type: String, default: '0' }, // 验证状态: 0-未用、1-已用
    time: Date, // 扫码时间
    device: String, // 扫码设备标识（小程序用户的openid）,
  },
  online: { type: Number, default: 1 }, // 是否接收在线简历投递
  remark: { type: String, maxLength: 500 } // 备注
};
const schema = new Schema(SchemaDefine, { 'multi-tenancy': true, toJSON: { virtuals: true } });
schema.index({ fair_id: 1 });
schema.index({ fair_id: 1, status: 1 });
schema.index({ corpid: 1 });
schema.index({ fair_id: 1, checkin: 1 });
schema.index({ fair_id: 1, status: 1, checkin: 1 });
schema.plugin(metaPlugin);

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('JobfairCorp', schema, 'jobs_jobfair_corp');
};
