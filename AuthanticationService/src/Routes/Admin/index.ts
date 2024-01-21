import { Router, Response, Request } from "express";

class AdminRouter {
  public router: Router = Router();
  public prefix = '/api/v1'
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes = () => {
    this.router.get(`${this.prefix}/admin`, (req: Request, res: Response): void => {
      res.send('Admin route');
    });
  }
}

export default AdminRouter;