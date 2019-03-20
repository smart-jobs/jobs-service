module.exports = {
  "query": {
    "parameters": {
      "query": ["!fair_id", "user.name", "user.yxdm", "type", "origin", "verify.status"],
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
};
