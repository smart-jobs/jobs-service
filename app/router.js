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
  // // 校园招聘会
  // router.post('/api/jobfair/list', controller.api.jobfair.list);
  // router.post('/api/jobfair/fetch', controller.api.jobfair.fetch);
  // router.post('/api/jobfair/enroll', controller.api.jobfair.apply);// 学生报名参加
  // router.post('/api/jobfair/apply', controller.api.jobfair.register);// 企业预定展位
  // // 校园宣讲会
  // router.get('/api/campustalk/list', controller.api.campus.list);
  // router.get('/api/campustalk/fetch', controller.api.campus.fetch);
  // router.post('/api/campustalk/apply', controller.api.campus.create);// 企业申请宣讲会

  // // 管理接口
  // // 校园招聘信息
  // router.get('/admin/jobinfo/query', controller.admin.jobinfo.query);// 查询招聘信息
  // router.get('/admin/jobinfo/detail', controller.admin.jobinfo.detail);// 获得招聘信息数据
  // router.post('/admin/jobinfo/update', controller.admin.jobinfo.update);// 修改招聘信息
  // router.post('/admin/jobinfo/publish', controller.admin.jobinfo.publish);// 管理员直接发布招聘信息
  // router.post('/admin/jobinfo/delete', controller.admin.jobinfo.publish);// 删除招聘信息
  // // 校园招聘会
  // router.get('/admin/jobfair/query', controller.admin.jobfair.query);// 查询招聘会信息
  // router.get('/admin/jobfair/detail', controller.admin.jobfair.detail);// 获得招聘会数据
  // router.post('/admin/jobfair/update', controller.admin.jobfair.update);// 修改招聘会信息
  // router.post('/admin/jobfair/publish', controller.admin.jobfair.publish);// 管理员直接发布招聘会信息
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
