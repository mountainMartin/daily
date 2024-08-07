import { Column } from 'typeorm';
import { IBaseEntity } from '../abstract/ibase-entity.interface';
import { BaseEntity } from './base.entity';

export class BaseIsActiveEntity extends BaseEntity implements IBaseEntity {
  @Column({
    name: 'is_active',
    type: 'tinyint',
    default: true,
    transformer: {
      to: (value: number) => (value ? 1 : 0),
      from: (value: number) => value === 1,
    },
  })
  public isActive: boolean;
}
