import { Router, Response, Request } from 'express';

interface RouteInterface {
  path?: string;
  router: Router;
}

class AdminRouter {
  public router: Router = Router();
  public path = '/api/v1'
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes = () => {
    this.router.get(`${this.path}/admin`, (req: Request, res: Response): void => {
      res.send('Admin route');
    });
  }
}

class mainRouter implements RouteInterface {
  public router: Router = Router();
  public path = '/api/v1'
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes = () => {
    this.router.use(`${this.path}/admin`, new AdminRouter().router);
  }

}

export default mainRouter;