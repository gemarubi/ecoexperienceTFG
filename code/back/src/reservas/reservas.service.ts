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
  async getFechasNoDisponibles(tipo: string): Promise<string[]> {
   // const tipoFormateado = tipo.replace(/_/g, ' ');
    const reservas = await this.reservasRepository
      .createQueryBuilder('reserva')
      .leftJoinAndSelect('reserva.rutas', 'ruta')
      .where('ruta.tipo = :tipo', { tipo })
      .getMany();
    console.log(tipo)
    //Preguntar si es mejor hacer el filtrado directamente en la consulta a bbdd (no consigo hacerlo con typeorm) 
    // o hacer una consulta de todas las reservas y filtrar por tipo despues
    let maxPorFechaGuia = 0;
    let maxPorFechaTukTuk = 0;
    let result;
    const reservasPorFecha: Record<string, number> = {};
    const guias = await this.usersRepository.find({ relations: ['roles'] });
    maxPorFechaGuia = guias.filter(u =>
      u.roles.some(r => r.descripcion === 'Guía')
    ).length;
    console.log(maxPorFechaGuia)
    reservas.forEach(res => {
        const fechaStr = res.fecha as unknown as string;
        reservasPorFecha[fechaStr] = (reservasPorFecha[fechaStr] || 0) + 1;
      });
     result = Object.keys(reservasPorFecha).filter(
      fecha => reservasPorFecha[fecha] >= maxPorFechaGuia
    );
    if (tipo === 'Tuk Tuk') {
      const tukTuks = await this.tuktuksRepository.find();
      maxPorFechaTukTuk = tukTuks.length;
    
      result = Object.keys(reservasPorFecha).filter(
        fecha => reservasPorFecha[fecha] >=  maxPorFechaTukTuk
      );
    }
   console.log(result)
    return result

  }
}
