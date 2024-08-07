import { IValidationHandler } from '../common/abstract/ivalidation-handler.interface';
import { TemplateDTO } from '../modules/template/template.dto';
import { TemplateValidationHandler } from '../modules/template/template.validation-handler';
import { TestDTO } from '../modules/test/test.dto';
import { TestValidationHandler } from '../modules/test/test.validation-handler';
import { UserDTO } from '../modules/user/user.dto';
import { UserValidationHandler } from '../modules/user/user.validation-handler';
import { ServiceManager } from './service.manager';

export class ValidationHandlerManager {
  private static instance: ValidationHandlerManager;
  private serviceManager: ServiceManager;

  private _testValidationHandler: IValidationHandler<TestDTO>;
  private _templateValidationHandler: IValidationHandler<TemplateDTO>;

  private _userValidationHandler: IValidationHandler<UserDTO>;

  constructor() {
    this.serviceManager = ServiceManager.getInstance();

    this._testValidationHandler = new TestValidationHandler();
    this._templateValidationHandler = new TemplateValidationHandler();

    this._userValidationHandler = new UserValidationHandler();
  }

  public static getInstance(): ValidationHandlerManager {
    if (!ValidationHandlerManager.instance) {
      ValidationHandlerManager.instance = new ValidationHandlerManager();
    }

    return ValidationHandlerManager.instance;
  }

  public get testValidationHandler(): IValidationHandler<TestDTO> {
    return this._testValidationHandler;
  }

  public get templateValidationHandler(): IValidationHandler<TemplateDTO> {
    return this._templateValidationHandler;
  }

  public get userValidationHandler(): IValidationHandler<UserDTO> {
    return this._userValidationHandler;
  }
}
