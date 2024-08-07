import { ITemplateMapper } from '../modules/template/itemplate-mapper.interface';
import { TemplateDTO } from '../modules/template/template.dto';
import { Template } from '../modules/template/template.entity';
import { TemplateMapper } from '../modules/template/template.mapper';
import { IUserMapper } from '../modules/user/iuser-mapper.interface';
import { UserDTO } from '../modules/user/user.dto';
import { User } from '../modules/user/user.entity';
import { UserMapper } from '../modules/user/user.mapper';

export class MapperManager {
  private static instance: MapperManager;

  private _templateMapper: ITemplateMapper;

  private _userMapper: IUserMapper;

  constructor() {
    this._templateMapper = new TemplateMapper(Template, TemplateDTO);

    this._userMapper = new UserMapper(User, UserDTO);
  }

  public static getInstance(): MapperManager {
    if (!MapperManager.instance) {
      MapperManager.instance = new MapperManager();
    }

    return MapperManager.instance;
  }

  public get templateMapper(): ITemplateMapper {
    return this._templateMapper;
  }

  public get userMapper(): IUserMapper {
    return this._userMapper;
  }
}
