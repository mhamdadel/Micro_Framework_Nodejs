import CustomConnectOptions from '@/Utilts/Interfaces/CustomConnectOptions';
import mongoose, { Mongoose } from 'mongoose';

class Database {
    private readonly uri: string;
    private mongoose: Mongoose;

    constructor(uri: string) {
        this.uri = uri;
        this.mongoose = mongoose;
        this.connect();
    }

    private connect(): void {
        const options: CustomConnectOptions = {
            useFindAndModify: false,
            useCreateIndex: true,
        };

        this.mongoose.connect(this.uri, options)
            .then(() => {
                console.log('MongoDB connected successfully');
            })
            .catch((error) => {
                console.error('MongoDB connection error:', error);
            });
    }

    public disconnect(): void {
        this.mongoose.disconnect()
            .then(() => {
                console.log('MongoDB disconnected');
            })
            .catch((error) => {
                console.error('Error disconnecting from MongoDB:', error);
            });
    }
}

export default Database;
