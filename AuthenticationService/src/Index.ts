import 'dotenv/config';
import 'module-alias/register';
import MainRouter from '@/Routes/index';
import App from './App';
import appConfig from './Helpers/appConfig';
(async () => (console.log( (await appConfig.db()).elasticsearch?.node)))()
const app = new App(new MainRouter(), Number(process.env.APPLICATION_PORT));

app.listen();

