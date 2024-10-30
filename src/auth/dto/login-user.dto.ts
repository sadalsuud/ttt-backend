import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'El correo no tiene formato de correo' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}
