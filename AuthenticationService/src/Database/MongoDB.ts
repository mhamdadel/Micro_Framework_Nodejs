import CustomConnectOptions from '@/Utilts/Interfaces/CustomConnectOptions';
import IDBConnection from '@/Utilts/Interfaces/IDBConnection';
import IDatabaseConnectionOptions from '@/Utilts/Interfaces/IDatabaseConnectionOptions';
import mongoose, { Mongoose } from 'mongoose';

class MongoDB implements IDBConnection {
    private readonly url: string;
    private mongoose: Mongoose;

    constructor(options: IDatabaseConnectionOptions) {
        this.url = options.url!;
        this.mongoose = mongoose;
    }

    public connect(): void {
        const options: CustomConnectOptions = {
            useFindAndModify: false,
            useCreateIndex: true,
        };

        this.mongoose.connect(this.url, options)
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

export default MongoDB;
