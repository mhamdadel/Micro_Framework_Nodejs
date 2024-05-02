import IRoute from '@/Utilts/Interfaces/IRouter';
import { Router, Response, Request } from 'express';
import AdminRouter from './Admin/index';
import NotFoundException from '@/Utilts/Exceptions/NotFoundException';

class MainRouter implements IRoute {
  public router: Router = Router();
  public prefix = '';
  constructor() {
    this.initializeRoutes()
    this.notFoundRoute();
  }

  private initializeRoutes = () => {
    this.router.use(`${this.prefix}/admin`, new AdminRouter().router);
  }

  private notFoundRoute = () => {
    this.router.use(`*`, (req: Request, res: Response): void => {
      throw new NotFoundException({ url: req.originalUrl });
    });
  }

}

export default MainRouter;