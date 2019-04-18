'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/test', controller.home.test);

  // 数据接口
  // 校园招聘信息
  // console.log(controller);
  router.get('/api/jobinfo/query_g', controller.api.jobinfo.query_g); // 【全站】查询所有已发布的信息
  router.get('/api/jobinfo/simple_g', controller.api.jobinfo.simple_g); // 【全站】查询所有已发布的信息，简单信息
  router.get('/api/jobinfo/query', controller.api.jobinfo.query); // 查询所有已发布的信息
  router.get('/api/jobinfo/simple', controller.api.jobinfo.simple); // 查询所有已发布的信息，简单信息
  router.get('/api/jobinfo/list', controller.api.jobinfo.list); // 查询当前用户提交的信息
  router.get('/api/jobinfo/fetch', controller.api.jobinfo.fetch);
  router.post('/api/jobinfo/create', controller.api.jobinfo.create);
  router.post('/api/jobinfo/update', controller.api.jobinfo.update);
  // 校园招聘会
  router.get('/api/jobfair/query_g', controller.api.jobfair.query_g); // 【全站】查询已发布的信息数据列表
  router.get('/api/jobfair/simple_g', controller.api.jobfair.simple_g); // 【全站】查询已发布的信息概要列表
  router.get('/api/jobfair/today', controller.api.jobfair.today); // 【全站】获取当前招聘会列表
  router.get('/api/jobfair/calendar', controller.api.jobfair.calendar); // 【全站】招聘会日历-获取制定月份列表
  router.get('/api/jobfair/query', controller.api.jobfair.query); // 查询已发布的信息数据列表
  router.get('/api/jobfair/simple', controller.api.jobfair.simple); // 查询已发布的信息概要列表
  router.get('/api/jobfair/fetch', controller.api.jobfair.fetch); // 【全站】获取信息详情
  router.get('/api/jobfair/corp/list', controller.api.jobfair.corp_list); // 【全站】招聘会参展信息
  router.post('/api/jobfair/corp/apply', controller.api.jobfair.corp_apply); // 企业预定展位
  router.post('/api/jobfair/corp/update', controller.api.jobfair.corp_update); // 企业预定展位信息修改
  router.get('/api/jobfair/corp/fetch', controller.api.jobfair.corp_fetch); // 【全站】通过招聘会和企业获得指企业展位信息
  router.get('/api/jobfair/corp/fetch2', controller.api.jobfair.corp_fetch2); // 【全站】通过id获得指定招聘会参展企业信息
  router.get('/api/jobfair/corp/mylist', controller.api.jobfair.corp_mylist); // 企业参与的招聘会信息列表
  router.post('/api/jobfair/corp/checkin', controller.api.jobfair.corp_checkin); // 企业招聘会入场签到
  router.post('/api/jobfair/corp/job/add', controller.api.jobfair.corp_job_add); // 企业添加招聘职位信息
  router.post('/api/jobfair/corp/job/update', controller.api.jobfair.corp_job_update); // 企业修改招聘职位信息
  router.post('/api/jobfair/corp/job/delete', controller.api.jobfair.corp_job_delete); // 企业删除招聘职位信息
  router.post('/api/jobfair/ticket/apply', controller.api.jobfair.ticket_apply); // 【全站】学生领取招聘会门票
  router.get('/api/jobfair/ticket/mylist', controller.api.jobfair.ticket_mylist); // 【全站】学生申请的招聘会门票列表
  router.post('/api/jobfair/ticket/verify', controller.api.jobfair.ticket_verify); // 【全站】招聘会门票扫码验证
  router.post('/api/jobfair/ticket/login', controller.api.jobfair.login); // 【全站】招聘会门票扫码登录
  // 校园宣讲会
  router.get('/api/campus/query_g', controller.api.campus.query_g); // 【全站】查询所有已发布的信息
  router.get('/api/campus/simple_g', controller.api.campus.simple_g); // 【全站】查询所有已发布的信息，简单信息
  router.get('/api/campus/query', controller.api.campus.query); // 查询所有已发布的信息
  router.get('/api/campus/simple', controller.api.campus.simple); // 查询所有已发布的信息，简单信息
  router.get('/api/campus/list', controller.api.campus.list); // 查询当前用户提交的信息
  router.get('/api/campus/fetch', controller.api.campus.fetch);
  router.post('/api/campus/create', controller.api.campus.create);
  router.post('/api/campus/update', controller.api.campus.update);
  router.get('/api/campus/calendar', controller.api.campus.calendar); // 【分站】宣讲会日历-获取制定月份列表
  router.post('/api/campus/job/add', controller.api.campus.job_add); // 添加招聘职位信息
  router.post('/api/campus/job/update', controller.api.campus.job_update); // 修改招聘职位信息
  router.post('/api/campus/job/delete', controller.api.campus.job_delete); // 删除招聘职位信息

  // 学生简历
  router.post('/api/resume/create', controller.api.resume.create); // 创建新的简历模板
  router.post('/api/resume/update', controller.api.resume.update); // 修改简历
  router.get('/api/resume/list', controller.api.resume.list); // 查询用户所有简历
  router.post('/api/resume/delete', controller.api.resume.delete); // 删除指定简历
  router.get('/api/resume/fetch', controller.api.resume.fetch); // 获得简历详细信息
  // 求职信
  router.post('/api/letter/deliver', controller.api.letter.deliver); // 【全站】学生投递求职信
  router.get('/api/letter/mylist', controller.api.letter.mylist); // 【全站】学生求职信列表
  router.post('/api/letter/reply', controller.api.letter.reply); // 企业回复求职信，修改求职信状态
  router.get('/api/letter/list', controller.api.letter.list); // 企业查询求职信列表
  router.get('/api/letter/fetch', controller.api.letter.fetch); // 【全站】获得求职信详细信息

  // 管理接口
  // 校园招聘信息
  router.get('/admin/jobinfo/query', controller.admin.jobinfo.query); // 查询招聘信息
  router.get('/admin/jobinfo/fetch', controller.admin.jobinfo.fetch); // 获得招聘信息数据
  router.post('/admin/jobinfo/update', controller.admin.jobinfo.update); // 修改招聘信息
  router.post('/admin/jobinfo/review', controller.admin.jobinfo.review); // 管理员审核发布招聘信息
  router.post('/admin/jobinfo/delete', controller.admin.jobinfo.delete); // 删除招聘信息
  router.post('/admin/jobinfo/create', controller.admin.jobinfo.create); // 添加招聘信息

  // 校园招聘会
  router.get('/admin/jobfair/query', controller.admin.jobfair.query); // 查询招聘会信息
  router.get('/admin/jobfair/fetch', controller.admin.jobfair.fetch); // 获得招聘会数据
  router.post('/admin/jobfair/create', controller.admin.jobfair.create); // 发布招聘会信息
  router.post('/admin/jobfair/update', controller.admin.jobfair.update); // 修改招聘会信息
  // router.post('/admin/jobfair/delete', controller.admin.jobfair.delete);// 删除招聘会信息
  // router.post('/admin/jobfair/review', controller.admin.jobfair.review);// 审核企业申请
  router.get('/admin/jobfair/corp/count', controller.admin.jobfair.corp_count); // 统计参会企业情况
  router.get('/admin/jobfair/corp/fetch', controller.admin.jobfairCorp.fetch); // 获得参会企业详情
  router.get('/admin/jobfair/corp/query', controller.admin.jobfairCorp.query); // 查询参会企业列表
  router.post('/admin/jobfair/corp/review', controller.admin.jobfairCorp.review); // 审核参会企业
  router.get('/admin/jobfair/corp/export', controller.admin.jobfairCorp.export); // 导出参会企业
  router.post('/admin/jobfair/corp/create', controller.admin.jobfairCorp.create); // 添加外部企业信息
  router.post('/admin/jobfair/corp/update', controller.admin.jobfairCorp.update); // 修改外部企业信息
  router.post('/admin/jobfair/corp/delete', controller.admin.jobfairCorp.delete); // 删除外部企业信息
  router.post('/admin/jobfair/corp/job/add', controller.admin.jobfairCorp.job_add); // 添加企业招聘职位信息
  router.post('/admin/jobfair/corp/job/update', controller.admin.jobfairCorp.job_update); // 修改企业招聘职位信息
  router.post('/admin/jobfair/corp/job/delete', controller.admin.jobfairCorp.job_delete); // 删除企业招聘职位信息
  router.get('/admin/jobfair/ticket/count', controller.admin.jobfair.ticket_count); // 统计入场券情况
  router.get('/admin/jobfair/ticket/query', controller.admin.jobfairTicket.query); // 查询入场券情况
  // 校园宣讲会
  router.get('/admin/campus/query', controller.admin.campus.query); // 查询宣讲会信息
  router.get('/admin/campus/fetch', controller.admin.campus.fetch); // 获得宣讲会数据
  router.post('/admin/campus/update', controller.admin.campus.update); // 修改宣讲会信息
  router.post('/admin/campus/review', controller.admin.campus.review); // 审核企业申请
  router.post('/admin/campus/create', controller.admin.campus.create); // 添加宣讲会信息
  router.post('/admin/campus/job/add', controller.admin.campus.job_add); // 添加招聘职位信息
  router.post('/admin/campus/job/update', controller.admin.campus.job_update); // 修改招聘职位信息
  router.post('/admin/campus/job/delete', controller.admin.campus.job_delete); // 删除招聘职位信息
};
