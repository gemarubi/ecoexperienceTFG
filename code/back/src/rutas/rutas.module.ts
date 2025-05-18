import { Module } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { RutasController } from './rutas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ruta])],
  controllers: [RutasController],
  providers: [RutasService],
})
export class RutasModule {}
