import MongoDB from "@/Database/MongoDB";
import DatabaseType from "@/Utilts/Types/DatabaseType";
import IDatabaseConnectionOptions from "@/Utilts/Interfaces/IDatabaseConnectionOptions";
import IDBConnection from "@/Utilts/Interfaces/IDBConnection";

class DatabaseFactory {
    private static connection: IDBConnection;
    static createDatabase(options: IDatabaseConnectionOptions, type: DatabaseType): any {
        if (this.connection) this.connection.disconnect();
        switch (type) {
            case 'mongodb':
                return new MongoDB(options);
            default:
                throw new Error(`Database type '${type}' not supported`);
        }
    }
}

export default DatabaseFactory;
