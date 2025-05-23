import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { Reserva } from './entities/reserva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Ruta } from 'src/rutas/entities/ruta.entity';
import { TukTuk } from 'src/tuktuks/entities/tuktuk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, User, Ruta, TukTuk])],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
