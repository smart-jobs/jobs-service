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

exports.TicketType = {
  NORMAL: '0', // 正常门票
  LIMITED: '1', // 受限门票
};

exports.UserOrigin = {
  LOCAL: '0', // 本校
  OTHER: '1', // 外校
};

exports.TicketStatus = {
  NORMAL: '0', // 未用
  USED: '1', // 已使用
};

exports.LetterStatus = {
  PENDING: '0', // 待处理
  ACCEPT: '1', // 已接收
  REJECT: '2', // 已拒绝
};

exports.CheckinStatus = {
  PENDING: '0', // 未签到
  FINISH: '1', // 已签到
};

