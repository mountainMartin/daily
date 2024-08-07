import { IBaseEntity } from './ibase-entity.interface';

export interface IBaseMapper<T extends IBaseEntity, DTO> {
  mapToEntity(dto: DTO): T;
  mapToDTO(entity: T): DTO;
}
