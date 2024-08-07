import { ITemplateFactory } from '../modules/template/itemplate-factory.interface';
import { TemplateFactory } from '../modules/template/template.factory';
import { IUserFactory } from '../modules/user/iuser-factory.interface';
import { UserFactory } from '../modules/user/user.factory';
import { MapperManager } from './mapper.manager';

export class FactoryManager {
  private static instance: FactoryManager;
  private mapperManager: MapperManager;

  private _templateFactory: ITemplateFactory;

  private _userFactory: IUserFactory;

  constructor() {
    this.mapperManager = MapperManager.getInstance();

    this._templateFactory = new TemplateFactory(
      this.mapperManager.templateMapper
    );

    this._userFactory = new UserFactory(this.mapperManager.userMapper);
  }

  public static getInstance(): FactoryManager {
    if (!FactoryManager.instance) {
      FactoryManager.instance = new FactoryManager();
    }

    return FactoryManager.instance;
  }

  public get templateFactory(): ITemplateFactory {
    return this._templateFactory;
  }

  public get userFactory(): IUserFactory {
    return this._userFactory;
  }
}
