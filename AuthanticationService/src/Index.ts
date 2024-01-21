import 'dotenv/config';
import 'module-alias/register';
import MainRouter from '@/Routes/index';
import App from './App';

const app = new App(new MainRouter(), Number(process.env.APPLICATION_PORT));

app.listen();

