import { ITemplateRepository } from '../modules/template/itemplate-repository.interface';
import { TemplateCreateLog } from '../modules/template/template-create-log.entity';
import { TemplateUpdateLog } from '../modules/template/template-update-log.entity';
import { Template } from '../modules/template/template.entity';
import { TemplateRepository } from '../modules/template/template.repository';
import { ITestRepository } from '../modules/test/itest-repository.interface';
import { Test } from '../modules/test/test.entity';
import { TestRepository } from '../modules/test/test.repository';
import { IUserRepository } from '../modules/user/iuser-repository.interface';
import { UserCreateLog } from '../modules/user/user-create-log.entity';
import { UserUpdateLog } from '../modules/user/user-update-log.entity';
import { User } from '../modules/user/user.entity';
import { UserRepository } from '../modules/user/user.repository';

export class RepositoryManager {
  private static instance: RepositoryManager;

  private _testRepository: ITestRepository;
  private _templateRepository: ITemplateRepository;

  private _userRepository: IUserRepository;

  private constructor() {
    this._testRepository = new TestRepository(Test);
    this._templateRepository = new TemplateRepository(
      Template,
      TemplateCreateLog,
      TemplateUpdateLog
    );

    this._userRepository = new UserRepository(
      User,
      UserCreateLog,
      UserUpdateLog
    );
  }

  public static getInstance(): RepositoryManager {
    if (!RepositoryManager.instance) {
      RepositoryManager.instance = new RepositoryManager();
    }

    return RepositoryManager.instance;
  }

  public get testRepository(): ITestRepository {
    return this._testRepository;
  }

  public get templateRepository(): ITemplateRepository {
    return this._templateRepository;
  }

  public get userRepository(): IUserRepository {
    return this._userRepository;
  }
}
