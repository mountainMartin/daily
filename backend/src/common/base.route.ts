import { Request, Response, Router, NextFunction } from 'express';
import { IBaseController } from '../abstract/ibase-controller.interface';

export class BaseRoute {
  public router: Router;
  protected controller: IBaseController;

  constructor(controller: IBaseController) {
    this.router = Router();
    this.controller = controller;
    this.routes();
  }

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response | NextFunction> => {
    try {
      await this.controller.getAll(req, res);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response | NextFunction> => {
    try {
      await this.controller.getById(req, res);
    } catch (error) {
      next(error);
    }
  };

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response | NextFunction> => {
    try {
      await this.controller.create(req, res);
    } catch (error) {
      next(error);
    }
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response | NextFunction> => {
    try {
      await this.controller.update(req, res);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response | NextFunction> => {
    try {
      await this.controller.delete(req, res);
    } catch (error) {
      next(error);
    }
  };

  public routes = (): void => {
    this.router.get('/', this.getAll);
    this.router.get('/:id/', this.getById);
    this.router.post('/', this.create);
    this.router.put('/:id/', this.update);
    this.router.delete('/:id/', this.delete);
  };
}
