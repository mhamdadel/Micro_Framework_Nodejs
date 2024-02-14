import express, { Application, Request, Response, NextFunction } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import csrf from 'csurf';

import IRouter from '@/Utilts/Interfaces/IRouter';
import HttpException from '@/Utilts/Exceptions/HttpException';
import appConfig from './Helpers/appConfig';
import inject from './Helpers/Decorators/inject';
import RESTService from './Helpers/Api/Services/RESTService';

appConfig;



class App {
    public express: Application;
    public port: number;

    constructor(router: IRouter, port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(router);
        this.initializeErrorHandling();
    }

    private initializeDatabaseConnection(): void {
        // initializeDatabaseConnection();
    }

    private initializeSecurityMiddleware(): void {
        this.express.use(helmet());
        this.express.enable('trust proxy');
        this.express.use(cors());
        this.express.use(morgan('dev'));
    }

    private initializeParsers(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cookieParser());
    }

    private initializeStaticFiles(): void {
        this.express.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    }

    private initializeCSRF(): void {
        const csrfProtection = csrf({ cookie: true });
        this.express.use(csrfProtection);
        this.express.use((req: Request, res: Response, next: NextFunction) => {
            res.cookie('XSRF-TOKEN', req.csrfToken());
            next();
        });
    }
    
    private initializeRequestCompression(): void {
        this.express.use(compression());
    }

    private initializeMiddleware(): void {
        this.initializeSecurityMiddleware();
        this.initializeParsers();
        this.initializeStaticFiles();
        this.initializeCSRF();
        this.initializeRequestCompression();
    }

    private initializeControllers(router: IRouter): void {
        this.express.use(router.router);
    }

    private initializeErrorHandling(): void {
        this.express.use((err: HttpException, req: Request, res: Response, next: NextFunction): void => {
            const {statusCode, status, message, stack} = err;
            if (process.env.APPLICATION_STRATEGY === "Development") {
                res.status(statusCode).json({statusCode, status, message, stack});
            } else {
                res.status(statusCode).json({statusCode, status, message});
            }
        });
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on port http://localhost:${this.port}`);
        });
    }
}

export default App;
