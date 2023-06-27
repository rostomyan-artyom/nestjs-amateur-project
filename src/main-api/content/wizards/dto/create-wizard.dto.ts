import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString, Matches, Max,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateWizardDto {
  @IsDefined({ message: 'Обязательно к заполнению' })
  @Matches('^[a-z0-9\\-]+$', '',{ message: 'в alias допускаются: английские буквы в нижнем регистре от a до z, цифры и тире' })
  @MinLength(3, { message: 'Alias должен иметь минимум 3 символа' })
  @MaxLength(50, { message: 'Alias может состоять максимум из 50 символов' })
  @IsString({ message: 'Должно быть строкой' })
  readonly alias: string;

  @IsDefined({ message: 'Обязательно к заполнению' })
  @MinLength(2, {
    message: 'Минимум 2 символа',
  })
  @MaxLength(150, {
    message: 'Максимум 150 символов',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @IsOptional()
  @Max(999999, {
    message: 'Максимум 999999',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly age: number;

  @IsOptional()
  @Max(999999, {
    message: 'Максимум 999999',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly height: number;

  @IsOptional()
  @Max(999999, {
    message: 'Максимум 999999',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly breast: number;

  @IsOptional()
  @Max(999999, {
    message: 'Максимум 999999',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly footSize: number;

  @IsOptional()
  @Max(999999, {
    message: 'Максимум 999999',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly weight: number;

  @IsOptional()
  @IsBoolean({ message: 'Должно быть булевым значением' })
  readonly isDoll: boolean;

  @IsDefined({ message: 'Обязательно к заполнению' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly statusId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly previewImageId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly genderId: number;
}
