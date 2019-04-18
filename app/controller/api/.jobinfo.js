module.exports = {
  create: {
    parameters: {
      query: ['!corpid']
    },
    requestBody: ['!title', 'content', '!city', 'expired', '!count', '!jobdesc', '!jobcat', '!nature', 'salary', '!xlreqs', '!zyreqs', 'online']
  },
  update: {
    parameters: {
      query: ['!id', '!corpid']
    },
    requestBody: ['title', 'content', 'city', 'expired', 'count', 'jobdesc', 'jobcat', 'nature', 'salary', 'xlreqs', 'zyreqs', 'online']
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
        title: 1,
        corpname: 1,
        'meta.createdAt': 1,
        online: 1,
        external: 1
      }
    }
  },
  // 【全站】查询信息详情
  fetch: {
    parameters: {
      query: ['!id']
    },
    service: 'api.jobinfoGlobal.fetch',
    options: {
      projection: '+content'
    }
  },
  // 【全站】查询信息列表
  query_g: {
    parameters: {
      query: { corpid: 'corpid' },
      options: {
        status: '0'
      }
    },
    service: 'api.jobinfoGlobal.query',
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
  // 【全站】查询信息简表
  simple_g: {
    parameters: {
      query: { corpid: 'corpid' },
      options: {
        status: '0'
      }
    },
    service: 'api.jobinfoGlobal.query',
    options: {
      query: ['skip', 'limit'],
      sort: ['meta.createdAt'],
      desc: true,
      count: true,
      projection: {
        title: 1,
        corpname: 1,
        unit: 1,
        'meta.createdAt': 1
      }
    }
  }
};
