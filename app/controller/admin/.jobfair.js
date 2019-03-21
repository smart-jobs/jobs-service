module.exports = {
  "create": {
    "requestBody": ["!type", "!subject", "!content", "city", "!address", "!time", "!date", "limit", "secret"]
  },
  "update": {
    "query": ["!id"],
    "requestBody": ["type", "subject", "content", "city", "address", "time", "date", "status", "limit", "secret"]
  },
  "query": {
    "parameters": {
      "query": ["status"],
    },
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
  "fetch": {
    "parameters": {
      "query": ["!id"]
    },
    "options": {
      "projection": "+content"
    },
  },
  // 审核参展企业信息
  "corp_review": {
    "parameters": {
      "query": ["!fair_id", "!corpid"] // 招聘会ID, 企业ID
    },
    "requestBody": ["!status", "booth", "remark"] // 审核状态，展位编号
  },
  // 获得参展企业信息
  "corp_fetch": {
    "parameters": {
      "query": ["!corpid", "!fair_id"] // 招聘会ID+企业ID
    },
  },
  // 获得招聘会的参展企业列表
  "corp_list": {
    "parameters": {
      "query": ["fair_id"] // 招聘会ID
    },
    "options": {
      "query": ["skip", "limit"]
    },
  },
  // 统计招聘会的参展企业情况
  "corp_count": {
    "parameters": {
      "query": ["fair_id"] // 招聘会ID
    },
  },
  // 统计招聘会的入场券情况
  "ticket_count": {
    "parameters": {
      "query": ["fair_id"] // 招聘会ID
    },
  },

};
