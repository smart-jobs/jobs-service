module.exports = {
  "create": {
    "parameters": {
      "query": {"userid": "userid", "user.id": "userid"}
    },
    "requestBody": ["title", "content", "info", "contact"]
  },
  "update": {
    "parameters": {
      "query": {"id": "id", "userid": "userid", "user.id": "userid"}
    },
    "requestBody": ["title", "content", "info", "contact"]
  },
  "delete": {
    "parameters": {
      "query": {"id": "id", "userid": "userid", "user.id": "userid"}
    },
  },
  "list": {
    "parameters": {
      "query": {"userid": "userid", "user.id": "userid"}
    },
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
  "fetch": {
    "parameters": {
      "query": ["id"]
    },
    "options": {
      "projection": "+content"
    }
  },
}
