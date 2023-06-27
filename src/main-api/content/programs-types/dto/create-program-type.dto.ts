import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateProgramTypeDto {
  @IsDefined({ message: 'Обязательно к заполнению' })
  @Matches('^[a-z0-9\\-]+$', '',{ message: 'в alias допускаются: английские буквы в нижнем регистре от a до z, цифры и тире' })
  @MinLength(3, { message: 'Alias должен иметь минимум 3 символа' })
  @MaxLength(50, { message: 'Alias может состоять максимум из 50 символов' })
  @IsString({ message: 'Должно быть строкой' })
  readonly alias: string;

  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly titleId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly shortDescriptionId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly descriptionId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly statusId: number;
}
