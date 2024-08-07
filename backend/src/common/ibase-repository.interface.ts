import { IBaseEntity } from './ibase-entity.interface';

export interface IBaseRepository<T extends IBaseEntity> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(entity: T): Promise<T | null>;
  update(id: string, entity: T): Promise<T | null>;
  delete(id: string): Promise<void>;
}
