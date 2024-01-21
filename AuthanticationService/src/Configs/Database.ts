export default {
  "default": "mongodb",
  "cache": "redis",
  "connections": {
    "mongodb": {
      "url": process.env.MONGODB_URL || "127.0.0.1",
      "port": process.env.MONGODB_PORT || 27017,
      "database": process.env.MONGODB_DATABASE || "your_mongodb_database",
      "options": {
        "useNewUrlParser": true,
        "useUnifiedTopology": true
      }
    },
    "mysql": {
      "url": process.env.MYSQL_URL || "127.0.0.1",
      "port": process.env.MYSQL_PORT || 3306,
      "database": process.env.MYSQL_DATABASE || "",
      "user": process.env.MYSQL_USER || "",
      "password": process.env.MYSQL_PASSWORD || "",
      "options": {
        
      }
    },
    "redis": {
      "host": process.env.REDIS_HOST || "127.0.0.1",
      "port": process.env.REDIS_PORT || 6379,
      "password": process.env.REDIS_PASSWORD || "",
      "options": {
        
      }
    },
    "elasticsearch": {
      "node": process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
      "auth": {
        "username": process.env.ELASTICSEARCH_USER || "",
        "password": process.env.ELASTICSEARCH_PASSWORD || ""
      },
      "options": {
        
      }
    }
  }
}
