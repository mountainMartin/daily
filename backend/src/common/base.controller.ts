import { Request, Response } from 'express';
import { IBaseService } from '../abstract/ibase-service.interface';
import { IBaseController } from '../abstract/ibase-controller.interface';
import { IValidationHandler } from '../abstract/ivalidation-handler.interface';

export class BaseController<DTO> implements IBaseController {
  protected service: IBaseService<DTO>;
  protected validationHandler: IValidationHandler<DTO>;

  constructor(service: IBaseService<DTO>, validationHandler: IValidationHandler<DTO>) {
    this.service = service;
    this.validationHandler = validationHandler;
  }

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.service.getAll();
      return res.status(200).send(data);
    } catch (error) {
      throw error;
    }
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    try {
      const data = await this.service.getById(id);
      return res.status(200).send(data);
    } catch (error) {
      throw error;
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const dto: DTO = req.body as DTO;

    try {
      const data = await this.service.create(dto);
      return res.status(201).send(data);
    } catch (error) {
      throw error;
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    const dto: DTO = req.body as DTO;

    try {
      const data = await this.service.update(id, dto);
      return res.status(201).send(data);
    } catch (error) {
      throw error;
    }
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;

    try {
      await this.service.delete(id);
      return res.sendStatus(204);
    } catch (error) {
      throw error;
    }
  };
}
