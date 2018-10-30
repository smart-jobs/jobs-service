module.exports = {
  "create": {
    "parameters": {
      "query": ["!corpid"]
    },
    "requestBody": ["title", "content", "city"]
  },
  "update": {
    "parameters": {
      "query": ["!id", "!corpid"]
    },
    "requestBody": ["title", "content", "city"]
  },
  "list": {
    "parameters": {
      "query": ["!corpid"]
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
      "query": ["!corpid"],
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
      "query": ["!corpid"],
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
        "title": 1,
        "corp.name": 1,
        "meta.createdAt": 1
      }
    }
  },
  // 【全站】查询信息详情
  "fetch": {
    "parameters": {
      "query": ["!id"]
    },
    "service": "api.jobinfoGlobal.fetch",
  },
  // 【全站】查询信息列表
  "query_g": {
    "parameters": {
      "query": ["!corpid"],
      "options": {
        "status": "0"
      }
    },
    "service": "api.jobinfoGlobal.query",
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
  // 【全站】查询信息简表
  "simple_g": {
    "parameters": {
      "query": ["!corpid"],
      "options": {
        "status": "0"
      }
    },
    "service": "api.jobinfoGlobal.query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createAt"],
      "desc": true,
      "count": true,
      "projection": {
        "title": 1,
        "corp.name": 1,
        "meta.createdAt": 1
      }
    }
  },
}
