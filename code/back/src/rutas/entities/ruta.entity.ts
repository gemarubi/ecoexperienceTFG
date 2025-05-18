import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity('rutas')
export class Ruta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  titulo: string;

  @Column()
  subtitulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ nullable: true })
  imagen: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  duracion: number; 

  @ManyToMany(() => Reserva, reserva => reserva.rutas)
  reservas: Reserva[];
} 
