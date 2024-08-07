import { DeepPartial, EntityTarget, FindOptionsWhere } from 'typeorm';
import { IBaseEntity } from '../abstract/ibase-entity.interface';
import { mainDataSource } from '../../database/sources/main-data.source';
import { IBaseRepository } from '../abstract/ibase-repository.interface';

export class BaseRepository<T extends IBaseEntity> implements IBaseRepository<T> {
  private entity: EntityTarget<T>;

  constructor(entity: EntityTarget<T>) {
    this.entity = entity;
  }

  public getAll = async (): Promise<T[]> =>
    mainDataSource.getRepository(this.entity).find();

  public getById = async (id: string): Promise<T | null> => {
    const whereConditions: FindOptionsWhere<T> = { id } as FindOptionsWhere<T>;
    return mainDataSource.getRepository(this.entity).findOne({ where: whereConditions });
  };

  public create = async (entity: DeepPartial<T>): Promise<T | null> => {
    const newEntity = await mainDataSource.transaction(
      async (transactionalEntityManager) => await transactionalEntityManager.save(entity)
    );

    const whereConditions: FindOptionsWhere<T> = {
      id: newEntity.id,
    } as FindOptionsWhere<T>;

    return await mainDataSource
      .getRepository(this.entity)
      .findOne({ where: whereConditions });
  };

  public update = async (id: string, entity: T): Promise<T | null> => {
    await mainDataSource.transaction(
      async (transactionalEntityManager) =>
        await transactionalEntityManager.getRepository(this.entity).update(id, entity)
    );

    const whereConditions: FindOptionsWhere<T> = {
      id: id,
    } as FindOptionsWhere<T>;

    return await mainDataSource
      .getRepository(this.entity)
      .findOne({ where: whereConditions });
  };

  public delete = async (id: string): Promise<void> => {
    await mainDataSource.getRepository(this.entity).delete(id);
  };
}
