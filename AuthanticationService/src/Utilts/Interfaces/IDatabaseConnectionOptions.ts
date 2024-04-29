export default interface IDatabaseConnectionOptions {
    url?: string;
    username?: string;
    password?: string;
    database?: string;
    host?: string;
    port?: number;
    sslOptions?: {
        enabled: boolean;
        certPath?: string;
        keyPath?: string;
        caPath?: string;
    };
    connectionPoolOptions?: {
        maxPoolSize?: number;
        idleTimeoutMillis?: number;
        connectionTimeoutMillis?: number;
    };
    timeoutSettings?: {
        connectTimeoutMS?: number;
        socketTimeoutMS?: number;
        queryTimeoutMS?: number;
    };
    driverOptions?: {
        driverName: string;
    };
    additionalOptions?: Record<string, any>;
}
