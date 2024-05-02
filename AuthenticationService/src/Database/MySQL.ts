import { Sequelize } from 'sequelize';
import IDBConnection from '@/Utilts/Interfaces/IDBConnection';
import IDatabaseConnectionOptions from '@/Utilts/Interfaces/IDatabaseConnectionOptions';

class MySQL implements IDBConnection {
    private readonly sequelize: Sequelize;

    constructor(options: IDatabaseConnectionOptions) {
        this.sequelize = new Sequelize({
            dialect: 'mysql',
            host: options.host!,
            port: options.port!,
            username: options.username!,
            password: options.password!,
            database: options.database!,
            pool: {
                max: 10,
                min: 0,
                acquire: 30000, // Maximum time in milliseconds that a connection can be idle before being released
                idle: 10000, // Maximum time in milliseconds that a connection can be idle before being closed
            },
        });
    }

    public async connect(): Promise<void> {
        try {
            await this.sequelize.authenticate();
            console.log('MySQL connected successfully');
        } catch (error) {
            console.error('Error connecting to MySQL:', error);
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await this.sequelize.close();
            console.log('MySQL disconnected');
        } catch (error) {
            console.error('Error disconnecting from MySQL:', error);
        }
    }
}

export default MySQL;
