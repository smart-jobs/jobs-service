module.exports = {
  "create": {
    "requestBody": ["type", "!subject", "!content", "city", "address", "time", "!date", "!unit"]
  },
  "update": {
    "query": ["!id"],
    "requestBody": ["type", "subject", "content", "city", "address", "time", "date"]
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
};
