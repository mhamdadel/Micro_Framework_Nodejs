import DatabaseType from "@/Utilts/Types/DatabaseType";

interface IDatabaseConnectionConfigs {
  url?: string;
  host?: string;
  node?: string;
  port?: number | undefined;
  database?: string;
  username?: string;
  password?: string;
  options?: Record<string, any>; 
}

type DatabaseConnections = Partial<Record<DatabaseType, IDatabaseConnectionConfigs>>;

interface IDatabaseConfig {
  default: string;
  cache: string;
  fulltext_search_engine: string;
  connections: DatabaseConnections;
}

const DatabaseConfig: IDatabaseConfig = {
  "default": "mongodb",
  "cache": "redis",
  "fulltext_search_engine": "elasticsearch",
  "connections": {
    "mongodb": {
      "url": process.env.MONGODB_URL || "127.0.0.1",
      "port": process.env.MONGODB_PORT ? parseInt(process.env.MONGODB_PORT, 10) : 27017,
      "database": process.env.MONGODB_DATABASE || "your_mongodb_database",
      "options": {
        "useNewUrlParser": true,
        "useUnifiedTopology": true
      }
    },
    "mysql": {
      "url": process.env.MYSQL_URL || "127.0.0.1",
      "port": process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
      "database": process.env.MYSQL_DATABASE || "",
      "username": process.env.MYSQL_USER || "",
      "password": process.env.MYSQL_PASSWORD || "",
      "options": {
        
      }
    },
    "redis": {
      "host": process.env.REDIS_HOST || "127.0.0.1",
      "port": process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
      "password": process.env.REDIS_PASSWORD || "",
      "options": {
        
      }
    },
    "elasticsearch": {
      "node": process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
      "username": process.env.ELASTICSEARCH_USER || "",
      "password": process.env.ELASTICSEARCH_PASSWORD || "",
      "options": {
        
      }
    }
  }
}

export default DatabaseConfig;
