module.exports = {
  "query": {
    "parameters": {
      "query": ["!fair_id", "corpname", "status"],
    },
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createdAt"],
      "desc": true,
      "count": true,
    }
  },
  "fetch": {
    "parameters": {
      "query": ["!id"]
    },
  },
  // 审核参展企业信息
  "review": {
    "parameters": {
      "query": ["!id"]
    },
    "requestBody": ["!status", "booth", "remark"] // 审核状态，展位编号
  },
};
