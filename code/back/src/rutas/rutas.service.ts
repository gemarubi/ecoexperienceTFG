
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SugerenciaRutaDto } from './dto/sugerencias-ruta.dto';
import { Ruta } from './entities/ruta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class RutasService {
  private readonly logger = new Logger('RutasService');

  constructor(
    @InjectRepository(Ruta)
    private readonly rutasRepository: Repository<Ruta>,

  ) { }

  async findAll() {
    try {
      return await this.rutasRepository.find({

      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error al obtener rutas');
    }
  }

  async findOne(id: number) {
    try {
      return await this.rutasRepository.find({ where: { id: id } });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Ruta no encontrada');
    }
  }

  async verSugerencias(sugerenciasRutaDto: SugerenciaRutaDto) {
    try {
      if (sugerenciasRutaDto.tipo == "Tuk Tuk") {
        return await this.rutasRepository.find({ where: { tipo: "Tuk Tuk" } });
      } else {
        const rutasPosibles = await this.rutasRepository.find(
          {
            where:
            {
              tipo: "A pie",
              precio: LessThanOrEqual(sugerenciasRutaDto.precioMax),
              duracion: Between(sugerenciasRutaDto.duracionMin, sugerenciasRutaDto.duracionMax)
            }
          })
        let rutasPreferentes: Ruta[] = [];
        if (sugerenciasRutaDto.preferencias.length > 0) {
          rutasPosibles.forEach(ruta => {
            sugerenciasRutaDto.preferencias.forEach(pref => {
              if (ruta.descripcion.toLowerCase().includes(pref.toLowerCase())) {
                if (!rutasPreferentes.find(r => r.id === ruta.id)) {
                  rutasPreferentes.push(ruta);
                }
              }
            });
          });
        }else{
          rutasPreferentes=rutasPosibles
        }


        return rutasPreferentes;
      }

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Ruta no encontrada');
    }
  }

}
