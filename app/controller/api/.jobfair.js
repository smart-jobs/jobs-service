module.exports = {
  // 查询信息列表
  "query": {
    "parameters": {},
    "service": "query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createAt"],
      "desc": true,
      "count": true,
      "projection": {
        "content": 0
      }
    }
  },
  // 信息简要列表
  "simple": {
    "parameters": {},
    "service": "query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createAt"],
      "desc": true,
      "count": true,
      "projection": {
        "unit": 1,
        "subject": 1,
        "meta.createdAt": 1
      }
    }
  },
  // 招聘会信息详情, 【全站】
  "fetch": {
    "parameters": {
      "query": ["_id"]
    },
    "service": "api.jobfairGlobal.query",
  },
  // 查询信息列表, 【全站】
  "query_g": {
    "parameters": {},
    "service": "api.jobfairGlobal.query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createAt"],
      "desc": true,
      "count": true,
      "projection": {
        "content": 0
      }
    }
  },
  // 信息简要列表, 【全站】
  "simple_g": {
    "parameters": {},
    "service": "api.jobfairGlobal.query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createAt"],
      "desc": true,
      "count": true,
      "projection": {
        "unit": 1,
        "subject": 1,
        "meta.createdAt": 1
      }
    }
  },
  /**
   * 企业参展相关接口
   */
  // 申请参会
  "corp_apply": {
    "parameters": {
      "query": ["id", "corp.id", "corp.name"] // 招聘会ID, 企业ID, 企业名称
    },
    "requestBody": ["jobs"] // 招聘职位列表
  },
  // 职位信息：增加、删除、修改
  "corp_job_add": { 
    "parameters": {
      "query": ["_id", "id", "corp.id"] // _id: 企业参会记录ID，招聘会ID，企业ID
    },
    "requestBody": ["name", "count", "requirement"]
  },
  "corp_job_update": { 
    "parameters": {
      "query": ["_id", "corp.id"] // _id: 企业参会招聘职位记录ID，嵌入文档ID
    },
    "requestBody": ["name", "count", "requirement"]
  },
  "corp_job_delete": { 
    "query": ["_id", , "corp.id"] // 企业参会招聘职位记录ID，嵌入文档ID
  },
  // 批量修改职位信息
  "corp_update": {
    "parameters": {
      "query": ["_id", "id", "corp.id"] // 企业参会记录ID，招聘会ID, 企业ID
    },
    "requestBody": ["jobs"] // 职位列表，全部替换
  },
  // 获得参展企业信息，【全站】
  "corp_fetch": {
    "parameters": {
      "query": ["corp.id", "id", "_id"] // 招聘会ID+企业ID：{ corp.id, id } or 参展企业信息数据ID：{ _id }
    },
    "service": "api.jobfairGlobal.corp_fetch",
  },
  // 【全站】获得招聘会的参展企业列表
  "corp_list": {
    "parameters": {
      "query": ["id"] // 招聘会ID
    },
    "options": {
      "query": ["skip", "limit"]
    },
    "service": "api.jobfairGlobal.corp_list"
  },
  // 获得企业参加的招聘会列表
  "corp_mylist": {
    "parameters": {
      "query": ["corp.id"]
    },
    "options": {
      "query": ["skip", "limit"]
    }
  },
  /**
   * 入场门票相关接口
   */
  // 领取门票, 【全站】
  "ticket_apply": {
    "parameters": {
      "query": ["id", "user.id"] // 招聘会ID, 学生ID
    },
    "service": "api.jobfairGlobal.ticket_apply",
  },
  // 验证门票, 【全站】
  "ticket_verify": {
    "parameters": {
      "query": ["_id", "device"] // 门票ID, 设备ID
    },
    "service": "api.jobfairGlobal.ticket_verify",
  },
  // 学生领取的门票列表, 【全站】
  "ticket_mylist": {
    "parameters": {
      "query": ["user.id"] // 学生ID
    },
    "options": {
      "query": ["skip", "limit"]
    },
    "service": "api.jobfairGlobal.ticket_mylist",
  },
  // 【全站】扫码设备登录
  "login": {
    "parameters": {
      "query": ["device"],
      "requestBody": ["_id", "password"]
    },
    "service": "api.jobfairGlobal.login",
  },
}
