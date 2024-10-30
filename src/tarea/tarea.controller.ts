import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';

@Controller('tarea')
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @Post()
  @Auth()
  @HttpCode(201)
  create(@Body() createTareaDto: CreateTareaDto, @GetUser() usuario: User) {
    console.log('esto es para crear una tarea');
    return this.tareaService.create(createTareaDto, usuario);
  }

  @Get()
  @Auth()
  findAll(@GetUser() usuario: User) {
    return this.tareaService.findAll(usuario);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser() usuario: User) {
    return this.tareaService.findOne(id, usuario);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTareaDto: UpdateTareaDto,
    @GetUser() usuario: User,
  ) {
    return this.tareaService.update(id, updateTareaDto, usuario);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() usuario: User) {
    console.log(id);
    return this.tareaService.remove(id, usuario);
  }
}
