import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePageBlogDto {
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
  @MinLength(4, { message: 'Description должен иметь минимум 4 символа' })
  @MaxLength(50, {
    message: 'Description может состоять максимум из 50 символов',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly blogId: number;
}
