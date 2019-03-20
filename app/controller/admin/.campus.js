
module.exports = {
  "create": {
    "requestBody": ["corpid", "corpname", "subject", "content", "address", "date", "time", "contact", "email", "jobs", "city"]
  },
  "review": {
    "query": ["!id"],
    "requestBody": ["!status"]
  },
  "update": {
    "query": ["!id"],
    "requestBody": ["corpname", "subject", "content", "address", "date", "time", "contact", "email", "jobs", "city"]
  },
  "query": {
    "parameters": {
      "query": ["status"],
    },
    "service": "query",
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
  }
};
