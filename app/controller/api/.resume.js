module.exports = {
  "create": {
    "parameters": {
      "query": ["!userid"]
    },
    "requestBody": ["!title", "!content", "!info", "!contact"]
  },
  "update": {
    "parameters": {
      "query": ["!id", "!userid"]
    },
    "requestBody": ["title", "content",
      "info.csrq", "info.xl", "info.yxmc", "info.zymc",
      "contact.mobile", "contact.email"]
  },
  "delete": {
    "parameters": {
      "query": ["!id", "!userid"]
    },
  },
  "list": {
    "parameters": {
      "query": ["!userid"]
    },
    "service": "query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createdAt"],
      "desc": true,
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
    }
  },
}
