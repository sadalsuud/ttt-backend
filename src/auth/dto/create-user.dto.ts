import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum roles {
  cliente = 'usuario',
  admin = 'admin',
}

export class CreateUserDto {
  @IsEmail({}, { message: 'El correo debe tener un formato correcto' })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La clave debe tener al menos mayúscula, minúscula y un número',
  })
  password: string;

  @IsString()
  @MinLength(3)
  nombre: string;

  // @IsEnum(roles)
  // @IsNotEmpty()
  // rol: string;
}
