module.exports = {
  query: {
    parameters: {
      query: ['!fair_id', 'corpname', 'status']
    },
    options: {
      query: ['skip', 'limit'],
      sort: ['meta.createdAt'],
      desc: true,
      count: true
    }
  },
  fetch: {
    parameters: {
      query: ['!id']
    }
  },
  // 审核参展企业信息
  review: {
    parameters: {
      query: ['!id']
    },
    requestBody: ['!status', 'booth', 'remark'] // 审核状态，展位编号
  },
  // 职位信息：增加、删除、修改
  corp_job_add: {
    parameters: {
      query: ['!id'] // 记录ID
    },
    requestBody: ['!name', 'count', 'requirement']
  },
  corp_job_update: {
    parameters: {
      query: ['!job_id'] // job_id: 企业参会招聘职位记录ID，嵌入文档ID
    },
    requestBody: ['name', 'count', 'requirement']
  },
  corp_job_delete: {
    query: ['!job_id'] // 企业参会招聘职位记录ID，嵌入文档ID
  }
};
