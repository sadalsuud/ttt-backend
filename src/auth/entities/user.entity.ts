import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tarea } from '../../tarea/entities/tarea.entity';

@Entity('users')
export class User {
  // llave primaria
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    select: false,
  })
  password?: string;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'bool', default: true })
  is_active: boolean;

  @Column({
    type: 'text',
    array: true,
    default: ['usuario'],
  })
  roles: string[];

  @Column({
    type: 'text',
    nullable: true,
  })
  token: string;

  @OneToMany(() => Tarea, (tarea) => tarea.usuario)
  tareas: Tarea[];
}
