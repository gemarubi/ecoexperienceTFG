import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity('tuktuk')
export class TukTuk {
  @PrimaryColumn()
  matricula: string;

  @Column()
  capacidad: number;

  @ManyToMany(() => Reserva, reserva => reserva.tukTuks)
  reservas: Reserva[];
}
