'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 数据接口
  // 校园招聘信息
  // console.log(controller);
  router.get('/api/jobinfo/query', controller.api.jobinfo.query); // 查询所有已发布的信息
  router.get('/api/jobinfo/list', controller.api.jobinfo.list); // 查询当前用户提交的信息
  router.get('/api/jobinfo/simple', controller.api.jobinfo.simple); // 查询所有已发布的信息，简单信息
  router.get('/api/jobinfo/fetch', controller.api.jobinfo.fetch);
  router.post('/api/jobinfo/create', controller.api.jobinfo.create);
  router.post('/api/jobinfo/update', controller.api.jobinfo.update);
  // 校园招聘会
  router.get('/api/jobfair/query', controller.api.jobfair.query);// 查询已发布的信息数据列表
  router.get('/api/jobfair/simple', controller.api.jobfair.simple);// 查询已发布的信息概要列表
  router.get('/api/jobfair/fetch', controller.api.jobfair.fetch);// 获取信息详情
  router.post('/api/jobfair/corp/apply', controller.api.jobfair.corp_apply);// 企业预定展位
  router.post('/api/jobfair/corp/update', controller.api.jobfair.corp_update);// 企业预定展位信息修改
  router.get('/api/jobfair/corp/fetch', controller.api.jobfair.corp_fetch);// 获得指定招聘会中指定企业预定展位信息
  router.get('/api/jobfair/corp/mylist', controller.api.jobfair.corp_mylist);// 企业参与的招聘会信息列表
  // router.post('/api/jobfair/ticket/apply', controller.api.jobfair.ticket_apply);// 学生报名参加
  // router.post('/api/jobfair/ticket/mylist', controller.api.jobfair.ticket_mylist);// 学生申请的招聘会门票列表
  // // 校园宣讲会
  // router.get('/api/campustalk/list', controller.api.campus.list);
  // router.get('/api/campustalk/fetch', controller.api.campus.fetch);
  // router.post('/api/campustalk/apply', controller.api.campus.create);// 企业申请宣讲会

  // 管理接口
  // 校园招聘信息
  // router.get('/admin/jobinfo/query', controller.admin.jobinfo.query);// 查询招聘信息
  // router.get('/admin/jobinfo/detail', controller.admin.jobinfo.detail);// 获得招聘信息数据
  // router.post('/admin/jobinfo/update', controller.admin.jobinfo.update);// 修改招聘信息
  // router.post('/admin/jobinfo/publish', controller.admin.jobinfo.publish);// 管理员直接发布招聘信息
  // router.post('/admin/jobinfo/delete', controller.admin.jobinfo.publish);// 删除招聘信息
  // 校园招聘会
  // router.get('/admin/jobfair/query', controller.admin.jobfair.query);// 查询招聘会信息
  // router.get('/admin/jobfair/detail', controller.admin.jobfair.detail);// 获得招聘会数据
  router.post('/admin/jobfair/create', controller.admin.jobfair.create);// 发布招聘会信息
  // router.post('/admin/jobfair/update', controller.admin.jobfair.update);// 修改招聘会信息
  // router.post('/admin/jobfair/delete', controller.admin.jobfair.update);// 删除招聘会信息
  // router.post('/admin/jobfair/review', controller.admin.jobfair.review);// 审核企业申请
  // // 校园宣讲会
  // router.get('/admin/campustalk/query', controller.admin.jobfair.query);// 查询宣讲会信息
  // router.get('/admin/campustalk/detail', controller.admin.jobfair.detail);// 获得宣讲会数据
  // router.post('/admin/campustalk/update', controller.admin.jobfair.update);// 修改宣讲会信息
  // router.post('/admin/campustalk/publish', controller.admin.jobfair.publish);// 管理员直接发布宣讲会信息
  // router.post('/admin/campustalk/delete', controller.admin.jobfair.update);// 删除宣讲会信息
  // router.post('/admin/campustalk/review', controller.admin.jobfair.review);// 审核企业申请
};
