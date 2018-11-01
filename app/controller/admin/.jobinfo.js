module.exports = {
  "create": {
    "requestBody": ["title", "content", "city"]
  },
  "update": {
    "query": ["!id"],
    "requestBody": ["title", "content", "city"]
  },
  "delete": {
    "query": ["!id"]
  },
  "review": {
    "parameters": {
      "query": ["!id"]
    },
    "requestBody": ["!status"]
  },
  "query": {
    "parameters": {
      "query": ["status"]
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
