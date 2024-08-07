import { ITemplateService } from '../modules/template/itemplate-service.interface';
import { TemplateService } from '../modules/template/template.service';
import { ITestService } from '../modules/test/itest-service';
import { TestDTO } from '../modules/test/test.dto';
import { Test } from '../modules/test/test.entity';
import { TestService } from '../modules/test/test.service';
import { IUserService } from '../modules/user/iuser-service.interface';
import { UserService } from '../modules/user/user.service';
import { FactoryManager } from './factory.manager';
import { MapperManager } from './mapper.manager';
import { RepositoryManager } from './repository.manager';

export class ServiceManager {
  private static instance: ServiceManager;

  private repositoryManager: RepositoryManager;
  private mapperManager: MapperManager;
  private factoryManager: FactoryManager;

  private _testService: ITestService;
  private _templateService: ITemplateService;

  private _userService: IUserService;

  constructor() {
    this.repositoryManager = RepositoryManager.getInstance();
    this.mapperManager = MapperManager.getInstance();
    this.factoryManager = FactoryManager.getInstance();

    this._testService = new TestService(
      this.repositoryManager.testRepository,
      Test,
      TestDTO
    );

    this._templateService = new TemplateService(
      this.repositoryManager.templateRepository,
      this.mapperManager.templateMapper,
      this.factoryManager.templateFactory
    );

    this._userService = new UserService(
      this.repositoryManager.userRepository,
      this.mapperManager.userMapper,
      this.factoryManager.userFactory
    );
  }

  public static getInstance(): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager();
    }

    return ServiceManager.instance;
  }

  public get testService(): ITestService {
    return this._testService;
  }

  public get templateService(): ITemplateService {
    return this._templateService;
  }

  public get userService(): IUserService {
    return this._userService;
  }
}
