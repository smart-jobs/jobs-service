module.exports = {
  "query": {
    "parameters": {
      "query": ["!fair_id", "name", "status"],
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
