import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

export enum estados {
  PENDIENTE = 'pendiente',
  PROGRESO = 'en progreso',
  COMPLETADA = 'completada',
}

@Entity()
export class Tarea {
  // llave primaria
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  titulo: string;

  @Column({ type: 'text', nullable: false })
  descripcion: string;

  @Column({ type: 'timestamp', nullable: false })
  vencimiento: Date;

  @Column({
    type: 'enum',
    enum: estados,
    default: estados.PENDIENTE,
  })
  estado: string;

  @ManyToOne(() => User, (user) => user.tareas)
  usuario: User;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
