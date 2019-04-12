module.exports = {
  "create": {
    "requestBody": ["corpid", "!corpname", "!title", "content", "city", "expired", "count", "jobdesc", "jobcat", "nature", "salary", "xlreqs", "zyreqs", "online"]
  },
  "update": {
    "query": ["!id"],
    "requestBody": ["corpname", "title", "content", "city", "expired", "count", "jobdesc", "jobcat", "nature", "salary", "xlreqs", "zyreqs", "online"]
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
      "query": ["status", "corpname", "external"]
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
