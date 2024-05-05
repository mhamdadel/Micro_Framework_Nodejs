import 'dotenv/config';
import 'module-alias/register';
import MainRouter from '@/Routes/index';
import App from './App';
import appConfig from './Helpers/appConfig';

(async () => {
  try {
    const dbConfig = await appConfig.db();
    console.log(dbConfig.elasticsearch?.node);

    const app = new App(new MainRouter(), Number(process.env.APPLICATION_PORT));
    app.listen();
  } catch (error) {
    console.error('Error:', error);
  }
})();
