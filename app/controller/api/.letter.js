module.exports = {
  // 投递求职信
  "deliver": {
    "parameters": {
      "query": ["!userid"]
    },
    "requestBody": ["corpid", "resumeid", "type", "origin"],
    "service": "api.letterGlobal.deliver",
  },
  // 学生的求职信列表
  "mylist": {
    "parameters": {
      "query": ["!userid"]
    },
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createAt"],
      "desc": true,
      "count": true,
      "projection": { userid: 1, title: 1, type: 1, origin: 1, corp: 1, meta: 1 },
    },
    "service": "api.letterGlobal.query",
  },
  // 企业回复求职信
  "reply": {
    "parameters": {
      "query": ["id", "corp.id"]
    },
    "requestBody": ["status", "reply"],
  },
  // 企业查询求职信列表
  "list": {
    "parameters": {
      "query": ["corp.id", "type", "origin"]
    },
    "service": "query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createAt"],
      "desc": true,
      "count": true,
    }
  },
  // 获取求职信详情
  "fetch": {
    "parameters": {
      "query": ["id", "corp.id"]
    },
    "options": {
      "projection": "+content +reply"
    },
    "service": "api.letterGlobal.fetch"
  },
}
