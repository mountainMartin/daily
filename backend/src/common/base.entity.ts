import { PrimaryGeneratedColumn } from 'typeorm';
import { IBaseEntity } from '../abstract/ibase-entity.interface';

export class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' }) // CHAR 36
  public id: string;
}
