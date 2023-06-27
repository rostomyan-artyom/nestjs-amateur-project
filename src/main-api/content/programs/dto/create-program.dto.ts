import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProgramDto {
  @IsDefined({ message: 'Обязательно к заполнению' })
  @Matches('^[a-z0-9\\-]+$', '', {
    message:
      'в alias допускаются: английские буквы в нижнем регистре от a до z, цифры и тире',
  })
  @MinLength(4, { message: 'Alias должен иметь минимум 4 символа' })
  @MaxLength(50, { message: 'Alias может состоять максимум из 50 символов' })
  @IsString({ message: 'Должно быть строкой' })
  readonly alias: string;

  @IsOptional()
  @Max(999999, {
    message: 'Максимум 999999',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly time: number;

  @IsOptional()
  @Max(999999, {
    message: 'Максимум 999999',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly price: number;

  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly imageId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly titleId: number;

  @IsDefined({ message: 'Обязательно к заполнению' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly statusId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly shortDescriptionId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly descriptionId: number;
}
