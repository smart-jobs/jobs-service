'use strict';

exports.JobinfoStatus = {
  NORMAL: '0', // 正常，审核通过
  PENDING: '1', // 待审核
  REJECT: '2', // 审核失败
};

exports.JobfairStatus = {
  OPENING: '0', // 开放申请
  CLOSED: '1', // 已关闭
  IN_PROGRESS: '2', // 进行中
};

exports.JobfairCorpStatus = {
  NORMAL: '0', // 正常，审核通过
  PENDING: '1', // 等待审核
  REJECT: '2', // 审核拒绝
};

exports.CampusTalkStatus = {
  NORMAL: '0', // 正常，审核通过
  PENDING: '1', // 待审核
  REJECT: '2', // 审核失败
};
