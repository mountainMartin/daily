import express from 'express';
import { ControllerManager } from './controller.manager';
import { TestRoute } from '../modules/test/test.route';
import { TemplateRoute } from '../modules/template/template.route';
import { UserRoute } from '../modules/user/user.route';

export class RouteManager {
  private baseURL: string;

  private controllerManager: ControllerManager;

  private testRoute: TestRoute;
  private templateRoute: TemplateRoute;

  private userRoute: UserRoute;

  constructor() {
    this.baseURL = '/api';

    this.controllerManager = ControllerManager.getInstance();

    this.testRoute = new TestRoute(this.controllerManager.testController);
    this.templateRoute = new TemplateRoute(
      this.controllerManager.templateController
    );

    this.userRoute = new UserRoute(this.controllerManager.userController);
  }

  public initializeRoutes = (app: express.Application): void => {
    app.use(this.baseURL + '/dev/test', this.testRoute.router);
    app.use(this.baseURL + '/dev/template', this.templateRoute.router);

    app.use(this.baseURL + '/users/', this.userRoute.router);
  };
}
