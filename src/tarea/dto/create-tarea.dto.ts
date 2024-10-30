import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { estados } from '../entities/tarea.entity';

export class CreateTareaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsOptional()
  descripcion?: string;

  @IsDate()
  vencimiento: Date;

  @IsEnum(estados)
  estado: string;
}
