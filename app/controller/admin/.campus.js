module.exports = {
  create: {
    requestBody: ['corpid', 'corpname', 'subject', 'content', 'address', 'date', 'time', 'contact', 'email', 'jobs']
  },
  review: {
    query: ['!id'],
    requestBody: ['!status']
  },
  update: {
    query: ['!id'],
    requestBody: ['corpname', 'subject', 'content', 'address', 'date', 'time', 'contact', 'email', 'jobs']
  },
  query: {
    parameters: {
      query: ['status', 'corpname', 'external']
    },
    service: 'query',
    options: {
      query: ['skip', 'limit'],
      sort: ['meta.createdAt'],
      desc: true,
      count: true,
      projection: {
        content: 0
      }
    }
  },
  fetch: {
    parameters: {
      query: ['!id']
    },
    options: {
      projection: '+content'
    }
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
