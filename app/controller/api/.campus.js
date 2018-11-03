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
    "requestBody": ["subject", "content", "address", "time", "contact", "email", "jobs"]
  },
  "list": {
    "parameters": {
      "query": {"!corpid": "corp.id"},
    },
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
  "query": {
    "parameters": {
      "query": {"corpid": "corp.id"},
      "options": {
        "status": "0"
      }
    },
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
  "simple": {
    "parameters": {
      "query": {"corpid": "corp.id"},
      "options": {
        "status": "0"
      }
    },
    "service": "query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createAt"],
      "desc": true,
      "count": true,
      "projection": {
        "subject": 1,
        "corp.name": 1,
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
      "query": {"corpid": "corp.id"},
      "options": {
        "status": "0"
      }
    },
    "service": "api.campusGlobal.query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createAt"],
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
      "query": {"corpid": "corp.id"},
      "options": {
        "status": "0"
      }
    },
    "service": "api.campusGlobal.query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createAt"],
      "desc": true,
      "count": true,
      "projection": {
        "subject": 1,
        "corp.name": 1,
        "meta.createdAt": 1
      }
    }
  },
}
