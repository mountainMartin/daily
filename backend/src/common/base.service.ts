import { IBaseEntity } from '../abstract/ibase-entity.interface';
import { IBaseMapper } from '../abstract/ibase-mapper.interface';
import { IBaseRepository } from '../abstract/ibase-repository.interface';
import { IBaseService } from '../abstract/ibase-service.interface';
import { BaseMapper } from './base.mapper';

export class BaseService<T extends IBaseEntity, DTO> implements IBaseService<DTO> {
  protected repository: IBaseRepository<T>;
  protected mapper: IBaseMapper<T, DTO>;

  constructor(
    repository: IBaseRepository<T>,
    entityConstructor: new (dto?: DTO) => T,
    dtoConstructor: new (entity?: T) => DTO
  ) {
    this.repository = repository;
    this.mapper = new BaseMapper(entityConstructor, dtoConstructor);
  }

  public getAll = async (): Promise<DTO[]> => {
    try {
      const entities = await this.repository.getAll();
      return entities.map((entity: T) => this.mapper.mapToDTO(entity));
    } catch (error) {
      throw error;
    }
  };

  public getById = async (id: string): Promise<DTO | null> => {
    try {
      const entity = await this.repository.getById(id);
      return entity ? this.mapper.mapToDTO(entity) : null;
    } catch (error) {
      throw error;
    }
  };

  public create = async (dto: DTO): Promise<DTO | null> => {
    try {
      const entity = this.mapper.mapToEntity(dto);
      const newEntity = await this.repository.create(entity);
      return newEntity ? this.mapper.mapToDTO(newEntity) : null;
    } catch (error) {
      throw error;
    }
  };

  public update = async (id: string, dto: DTO): Promise<DTO | null> => {
    try {
      const entity = this.mapper.mapToEntity(dto);
      const updatedEntity = await this.repository.update(id, entity);
      return updatedEntity ? this.mapper.mapToDTO(updatedEntity) : null;
    } catch (error) {
      throw error;
    }
  };

  public delete = async (id: string): Promise<void> => {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw error;
    }
  };
}
