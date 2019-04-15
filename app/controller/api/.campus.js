module.exports = {
  create: {
    parameters: {
      query: ['!corpid']
    },
    requestBody: ['subject', 'content', 'address', 'time', 'contact', 'email', 'jobs', 'date']
  },
  update: {
    parameters: {
      query: ['!id', '!corpid']
    },
    requestBody: ['subject', 'content', 'address', 'time', 'contact', 'email', 'jobs', 'date']
  },
  list: {
    parameters: {
      query: { '!corpid': 'corpid' }
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
  query: {
    parameters: {
      query: { corpid: 'corpid' },
      options: {
        status: '0'
      }
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
  simple: {
    parameters: {
      query: { corpid: 'corpid' },
      options: {
        status: '0'
      }
    },
    service: 'query',
    options: {
      query: ['skip', 'limit'],
      sort: ['meta.createdAt'],
      desc: true,
      count: true,
      projection: {
        subject: 1,
        corpname: 1,
        'meta.createdAt': 1
      }
    }
  },
  // 【全站】查询信息详情
  fetch: {
    parameters: {
      query: ['!id']
    },
    service: 'api.campusGlobal.fetch',
    options: {
      projection: '+content'
    }
  },
  // 【全站】查询信息详情
  query_g: {
    parameters: {
      query: { corpid: 'corpid' },
      options: {
        status: '0'
      }
    },
    service: 'api.campusGlobal.query',
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
  // 【全站】查询信息摘要
  simple_g: {
    parameters: {
      query: { corpid: 'corpid' },
      options: {
        status: '0'
      }
    },
    service: 'api.campusGlobal.query',
    options: {
      query: ['skip', 'limit'],
      sort: ['meta.createdAt'],
      desc: true,
      count: true,
      projection: {
        subject: 1,
        corpname: 1,
        unit: 1,
        'meta.createdAt': 1
      }
    }
  },
  // 职位信息：增加、删除、修改
  job_add: {
    parameters: {
      query: ['!id', '!corpid'] // 企业ID
    },
    requestBody: ['!name', 'count', 'requirement']
  },
  job_update: {
    parameters: {
      query: ['!job_id', '!corpid'] // job_id: 企业参会招聘职位记录ID，嵌入文档ID
    },
    requestBody: ['name', 'count', 'requirement']
  },
  job_delete: {
    query: ['!job_id', '!corpid'] // 企业参会招聘职位记录ID，嵌入文档ID
  }
};
