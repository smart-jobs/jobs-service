module.exports = {
  create: {
    parameters: {
      query: ['!fair_id']
    },
    requestBody: ['!corpname', '!description', 'booth', 'jobs']
  },
  update: {
    query: ['!id'],
    requestBody: ['booth', 'description', 'jobs']
  },
  delete: {
    query: ['!id']
  },
  query: {
    parameters: {
      query: ['!fair_id', 'corpname', 'status']
    },
    options: {
      query: ['skip', 'limit'],
      sort: ['meta.createdAt'],
      desc: false,
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
  job_add: {
    parameters: {
      query: ['!id'] // 记录ID
    },
    requestBody: ['!name', 'count', 'requirement']
  },
  job_update: {
    parameters: {
      query: ['!job_id'] // job_id: 企业参会招聘职位记录ID，嵌入文档ID
    },
    requestBody: ['name', 'count', 'requirement']
  },
  job_delete: {
    query: ['!job_id'] // 企业参会招聘职位记录ID，嵌入文档ID
  }
};
