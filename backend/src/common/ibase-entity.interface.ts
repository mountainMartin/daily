import { ObjectLiteral } from 'typeorm';

export interface IBaseEntity extends ObjectLiteral {
  id: string;
}
