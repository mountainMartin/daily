import { IBaseEntity } from '../abstract/ibase-entity.interface';
import { IBaseMapper } from '../abstract/ibase-mapper.interface';

export class BaseMapper<T extends IBaseEntity, DTO> implements IBaseMapper<T, DTO> {
  private entityConstructor: new (dto?: DTO) => T;
  private dtoConstructor: new (entity?: T) => DTO;

  constructor(
    entityConstructor: new (dto?: DTO) => T,
    dtoConstructor: new (entity?: T) => DTO
  ) {
    this.entityConstructor = entityConstructor;
    this.dtoConstructor = dtoConstructor;
  }

  public mapToEntity(dto: DTO): T {
    return new this.entityConstructor(dto);
  }

  public mapToDTO(entity: T): DTO {
    return new this.dtoConstructor(entity);
  }
}
