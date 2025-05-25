import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Ruta } from 'src/rutas/entities/ruta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { In, Not, Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { TukTuk } from 'src/tuktuks/entities/tuktuk.entity';
import { Length } from 'class-validator';


@Injectable()
export class ReservasService {

  constructor(
    @InjectRepository(Ruta)
    private readonly rutasRepository: Repository<Ruta>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Reserva)
    private readonly reservasRepository: Repository<Reserva>,
    @InjectRepository(TukTuk)
    private readonly tuktuksRepository: Repository<TukTuk>
  ) { }
  async create(createReservaDto: CreateReservaDto, user:number) {
    const {
      fecha,
      hora,
      asistentes,
      observaciones,
      guiaId,
      rutasIds,
    } = createReservaDto;
    console.log(user)
    const cliente = await this.usersRepository.findOneBy({ id: user });
    console.log(cliente)
    const rutas = await this.rutasRepository.findBy({ id: In(rutasIds) });

    if (!cliente ) {
      throw new NotFoundException('Cliente no encontrado');
    }


    const reserva = this.reservasRepository.create({
      fecha,
      hora,
      asistentes,
      observaciones,
      cliente,
      rutas,
    });
    console.log(reserva)
    
    const requiereTukTuk = rutas.some(ruta => ruta.tipo === 'Tuk Tuk');

    if (requiereTukTuk) {
      const mismaHora = await this.findMismaHoraFecha(createReservaDto);

      const conTukTukIds = mismaHora
        .filter(res => res.rutas.some(r => r.tipo === 'Tuk Tuk'))
        .map(res => res.id);

      const tukTuksDisponibles = await this.tuktukLibres(conTukTukIds);

      if (tukTuksDisponibles.length === 0) {
        throw new ConflictException('No hay Tuk Tuks disponibles en esa fecha y hora');
      }


      reserva.tukTuks = [tukTuksDisponibles[0]];
    }

    const reservaGuardada = await this.reservasRepository.save(reserva);
    return reservaGuardada;
  }


  async findMismaHoraFecha(reserva: CreateReservaDto) {
    return await this.reservasRepository.find({
      where: {
        fecha: reserva.fecha,
        hora: reserva.hora,

      },
      relations: ['rutas', 'tukTuks'],
    });
  }



  async tuktukLibres(idsReservas: number[]) {

    return await this.tuktuksRepository.find({
      where: {
        reservas: {
          id: Not(In(idsReservas)),
        },
      },
      relations: ['reservas'],
    });
  }
  async getFechasNoDisponibles(tipo: string): Promise<{ fecha: string; desde: string; hasta: string }[]> {
 
    const reservas = await this.reservasRepository
      .createQueryBuilder('reserva')
      .leftJoinAndSelect('reserva.rutas', 'ruta')
      .where('ruta.tipo = :tipo', { tipo })
      .getMany();
     const maxDisponibles = await this.maximoPorTipo(tipo);
    const resPorFecha = this.mapearIntervalosPorFecha(reservas);
    return this.intervalosSolapados(resPorFecha, maxDisponibles);

  }

  mapearIntervalosPorFecha(reservas: any[]): Record<string, { inicio: Date; fin: Date }[]> {
  const mapa: Record<string, { inicio: Date; fin: Date }[]> = {};

  reservas.forEach(res => {
    const fecha = new Date(res.fecha); 
    const fechaStr = fecha.toISOString().split('T')[0];

    let duracion = 0;
    res.rutas.forEach(r => duracion += r.duracion);

    const inicio = new Date(`${fechaStr}T${res.hora}`);
    const fin = new Date(inicio.getTime() + duracion * 60000);

    if (!mapa[fechaStr]) {
      mapa[fechaStr] = [];
    }

    mapa[fechaStr].push({ inicio, fin });
  });

  return mapa;
}

async maximoPorTipo(tipo:string){
  if (tipo === 'Tuk Tuk') {
    const tukTuks = await this.tuktuksRepository.find();
    return tukTuks.length;
  } else {
    const guias = await this.usersRepository.find({ relations: ['roles'] });
    let total = 0;
    guias.forEach(g =>
      g.roles.forEach(r => {
        if (r.descripcion === 'Guía') total++;
      })
    );
    return total;
  }
}
intervalosSolapados(
  reservasPorFecha: Record<string, { inicio: Date; fin: Date }[]>,
  maxDisponibles: number
): { fecha: string; desde: string; hasta: string }[] {
  const bloqueados: { fecha: string; desde: string; hasta: string }[] = [];

  for (const fecha in reservasPorFecha) {
    const intervalos = reservasPorFecha[fecha];

    intervalos.forEach(actual => {
      let solapados = 0;

      intervalos.forEach(otro => {
        const aInicio = actual.inicio.getTime();
        const aFin = actual.fin.getTime();
        const bInicio = otro.inicio.getTime();
        const bFin = otro.fin.getTime();

        if (aInicio < bFin && aFin > bInicio) {
          solapados++;
        }
      });

      if (solapados >= maxDisponibles) {
        const desde = actual.inicio.toTimeString().slice(0, 5);
        const hasta = actual.fin.toTimeString().slice(0, 5);

        let existe = false;
        bloqueados.forEach(b => {
          if (b.fecha === fecha && b.desde === desde && b.hasta === hasta) {
            existe = true;
          }
        });

        if (!existe) {
          bloqueados.push({ fecha, desde, hasta });
        }
      }
    });
  }

  return bloqueados;
}
}
