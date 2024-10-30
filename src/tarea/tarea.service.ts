import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Repository } from 'typeorm';
import { Tarea } from './entities/tarea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
  ) {}

  async create(createTareaDto: CreateTareaDto, usuario: User) {
    try {
      const tarea = this.tareaRepository.create({
        ...createTareaDto,
        usuario,
      });
      await this.tareaRepository.save(tarea);
      return 'Tarea creada con éxito';
    } catch (error) {
      throw new InternalServerErrorException(error.detail);
    }
  }

  findAll(usuario: User) {
    // se consultan las tareas que solo pertencen al usuario logueado
    return this.tareaRepository.findBy({
      usuario: { id: usuario.id },
    });
  }

  async findOne(id: string, usuario: User) {
    const tarea = await this.tareaRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });
    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada');
    }
    if (tarea.usuario.id != usuario.id) {
      throw new BadRequestException(
        'Solo el dueño de la tarea la puede manipular',
      );
    }
    return tarea;
  }

  async update(id: string, updateTareaDto: UpdateTareaDto, usuario: User) {
    try {
      const tarea = await this.findOne(id, usuario);
      Object.assign(tarea, updateTareaDto);
      await this.tareaRepository.save(tarea);
      return 'Tarea modificada con éxito';
    } catch (e) {
      throw new InternalServerErrorException(e.detail);
    }
  }

  async remove(id: string, usuario: User) {
    await this.findOne(id, usuario);
    await this.tareaRepository.delete({ id });
    return 'Tarea borrada con éxito';
  }
}
