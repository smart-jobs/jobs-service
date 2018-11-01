
module.exports = {
  "create": {
    "requestBody": ["type", "subject", "content", "city", "address", "time", "date", "unit"]
  },
  "review": {
    "query": ["!id"],
    "requestBody": ["!status"]
  },
  "update": {
    "query": ["!id"],
    "requestBody": ["!status"]
  },
  "query": {
    "parameters": {
      "query": ["status"],
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
  "fetch": {
    "query": ["!id"]
  }
};
