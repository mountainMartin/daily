export interface IValidationHandler<DTO> {
  validate(dto: DTO): Promise<boolean>;
}
