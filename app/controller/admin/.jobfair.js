module.exports = {
  "create": {
    "requestBody": ["type", "subject", "content", "city", "address", "time", "date", "unit"]
  },
  "query": {
    "parameters": {},
    "service": "query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createAt"],
      "desc": true,
      "projection": {
        "content": 0
      }
    }
  },
  "simple": {
    "parameters": {},
    "service": "query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createAt"],
      "desc": true,
      "projection": {
        "tenant": 1,
        "title": 1,
        "meta.createdAt": 1
      }
    }
  },
  "fetch": {
    "query": ["!id"]
  }
};
