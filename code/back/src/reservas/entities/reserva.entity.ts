import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Ruta } from '../../rutas/entities/ruta.entity';
import { User } from 'src/users/entities/user.entity';
import { TukTuk } from 'src/tuktuks/entities/tuktuk.entity';


@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column()
  hora: string;

  @Column()
  asistentes: number;

  @Column({ nullable: true })
  observaciones: string;

  @ManyToOne(() => User, user => user.reservasCliente)
  cliente?: User;

  @ManyToOne(() => User, user => user.reservasGuia)
  guia: User;

  @ManyToMany(() => Ruta, ruta => ruta.reservas)
  @JoinTable({
    name: 'rutas_reserva',
    joinColumn: { name: 'id_reserva', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'id_ruta', referencedColumnName: 'id' }
  })
  rutas: Ruta[];

  @ManyToMany(() => TukTuk, tuk => tuk.reservas)
  @JoinTable({
    name: 'tuk_tuk_reserva',
    joinColumn: { name: 'id_reserva', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'matricula_tuk_tuk', referencedColumnName: 'matricula' }
  })
  tukTuks: TukTuk[];
}

