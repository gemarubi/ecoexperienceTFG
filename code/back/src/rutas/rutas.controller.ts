import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { SugerenciaRutaDto } from './dto/sugerencias-ruta.dto';
import { Reserva } from 'src/reservas/entities/reserva.entity';
import { CreateReservaDto } from 'src/reservas/dto/create-reserva.dto';

@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}

  @Post()
  verSugerencias(@Body() sugerenciasRutaDto: SugerenciaRutaDto) {
    return this.rutasService.verSugerencias(sugerenciasRutaDto);
  }

  @Get()
  findAll() {
    return this.rutasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rutasService.findOne(+id);
  }

 
}
