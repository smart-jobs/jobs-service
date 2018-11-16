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
      "sort": ["meta.createdAt"],
      "desc": true,
      "count": true,
      "projection": { userid: 1, title: 1, type: 1, origin: 1, corpid: 1, corpname: 1, meta: 1, status: 1 },
    },
    "service": "api.letterGlobal.query",
  },
  // 企业回复求职信
  "reply": {
    "parameters": {
      "query": ["!id", "!corpid"]
    },
    "requestBody": ["status", "reply"],
  },
  // 企业查询求职信列表
  "list": {
    "parameters": {
      "query": {"!corpid":"corpid", "type":"type", "origin":"origin"}
    },
    "service": "query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createdAt"],
      "desc": true,
      "count": true,
    }
  },
  // 获取求职信详情
  "fetch": {
    "parameters": {
      "query": ["!id"]
    },
    "options": {
      "projection": "+content +reply"
    },
    "service": "api.letterGlobal.fetch"
  },
}
