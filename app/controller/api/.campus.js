module.exports = {
  "create": {
    "parameters": {
      "query": ["!corpid"]
    },
    "requestBody": ["subject", "content", "address", "time", "contact", "email", "jobs", "date"]
  },
  "update": {
    "parameters": {
      "query": ["!id", "!corpid"]
    },
    "requestBody": ["subject", "content", "address", "time", "contact", "email", "jobs", "date"]
  },
  "list": {
    "parameters": {
      "query": {"!corpid": "corpid"},
    },
    "service": "query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createdAt"],
      "desc": true,
      "count": true,
      "projection": {
        "content": 0
      }
    }
  },
  "query": {
    "parameters": {
      "query": {"corpid": "corpid"},
      "options": {
        "status": "0"
      }
    },
    "service": "query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createdAt"],
      "desc": true,
      "count": true,
      "projection": {
        "content": 0
      }
    }
  },
  "simple": {
    "parameters": {
      "query": {"corpid": "corpid"},
      "options": {
        "status": "0"
      }
    },
    "service": "query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createdAt"],
      "desc": true,
      "count": true,
      "projection": {
        "subject": 1,
        "corpname": 1,
        "meta.createdAt": 1
      }
    }
  },
  // 【全站】查询信息详情
  "fetch": {
    "parameters": {
      "query": ["!id"],
    },
    "service": "api.campusGlobal.fetch",
  },
  // 【全站】查询信息详情
  "query_g": {
    "parameters": {
      "query": {"corpid": "corpid"},
      "options": {
        "status": "0"
      }
    },
    "service": "api.campusGlobal.query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createdAt"],
      "desc": true,
      "count": true,
      "projection": {
        "content": 0
      }
    },
  },
  // 【全站】查询信息摘要
  "simple_g": {
    "parameters": {
      "query": {"corpid": "corpid"},
      "options": {
        "status": "0"
      }
    },
    "service": "api.campusGlobal.query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createdAt"],
      "desc": true,
      "count": true,
      "projection": {
        "subject": 1,
        "corpname": 1,
        "meta.createdAt": 1
      }
    }
  },
}
