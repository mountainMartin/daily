import { ITemplateController } from '../modules/template/itemplate-controller.interface';
import { TemplateController } from '../modules/template/template.controller';
import { ITestController } from '../modules/test/itest-controller.interface';
import { TestController } from '../modules/test/test.controller';
import { IUserController } from '../modules/user/iuser-controller.interface';
import { UserController } from '../modules/user/user.controller';
import { ServiceManager } from './service.manager';
import { ValidationHandlerManager } from './validation-handler.manager';

export class ControllerManager {
  private static instance: ControllerManager;

  private serviceManager: ServiceManager;
  private validationHandlerManager: ValidationHandlerManager;

  private _testController: ITestController;
  private _templateController: ITemplateController;

  private _userController: IUserController;

  constructor() {
    this.serviceManager = ServiceManager.getInstance();
    this.validationHandlerManager = ValidationHandlerManager.getInstance();

    this._testController = new TestController(
      this.serviceManager.testService,
      this.validationHandlerManager.testValidationHandler
    );

    this._templateController = new TemplateController(
      this.serviceManager.templateService,
      this.validationHandlerManager.templateValidationHandler
    );

    this._userController = new UserController(
      this.serviceManager.userService,
      this.validationHandlerManager.userValidationHandler
    );
  }

  public static getInstance(): ControllerManager {
    if (!ControllerManager.instance) {
      ControllerManager.instance = new ControllerManager();
    }

    return ControllerManager.instance;
  }

  public get testController(): ITestController {
    return this._testController;
  }

  public get templateController(): ITemplateController {
    return this._templateController;
  }

  public get userController(): IUserController {
    return this._userController;
  }
}
