import { Request, Response, NextFunction } from 'express';

export interface IBaseRoute {
  getAll(
    req: Request,
    res: Response,
    nex: NextFunction
  ): Promise<void | Response | NextFunction>;
  getById(
    req: Request,
    res: Response,
    nex: NextFunction
  ): Promise<void | Response | NextFunction>;
  create(
    req: Request,
    res: Response,
    nex: NextFunction
  ): Promise<void | Response | NextFunction>;
  update(
    req: Request,
    res: Response,
    nex: NextFunction
  ): Promise<void | Response | NextFunction>;
  delete(
    req: Request,
    res: Response,
    nex: NextFunction
  ): Promise<void | Response | NextFunction>;
}
