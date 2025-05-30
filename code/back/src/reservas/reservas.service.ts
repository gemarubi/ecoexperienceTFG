
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Ruta } from 'src/rutas/entities/ruta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { In, Not, Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { TukTuk } from 'src/tuktuks/entities/tuktuk.entity';
import { Length, IsDateString } from 'class-validator';


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

  async getAllReservas() {
    try {
      const reservas = await this.reservasRepository.find({
        relations: ['cliente', 'tukTuks', 'rutas', 'guia'],
        order: { fecha: 'ASC', hora: 'ASC' },
      });

      return reservas.map(res => ({
        id: res.id,
        fecha: res.fecha,
        hora: res.hora,
        asistentes: res.asistentes,
        observaciones: res.observaciones,
        clienteNombre: res.cliente,
        guia: res.guia ? {
          id: res.guia.id,
          nombre: res.guia.nombre,
          apellidos: res.guia.apellidos,
          correo: res.guia.correo
        } : null,
        rutas: res.rutas.map(r => r.titulo),
        tukTuks: res.tukTuks.map(t => t.matricula),
      }));
    } catch (error) {
      return error
    }
  }

  async findGuiasLibres(idReserva: number) {
    try {

      const usuarios = await this.usersRepository.find({
        relations: ['roles'],
      });

      const guias = usuarios.filter(user =>
        user.roles.some(role => role.descripcion === 'Guía')
      );
      const reserva = await this.reservasRepository.find({
        where: { id: idReserva },
        relations: ['rutas']
      })
      console.log(reserva)
      const ruta = await this.rutasRepository.find({ where: { id: reserva[0].rutas[0].id } })

      const reservas = await this.reservasRepository.find({
        where: { fecha: reserva[0].fecha },
        relations: ['guia'],
      });
      console.log(reservas)

      const inicioNueva = new Date(`${reserva[0].fecha}T${reserva[0].hora}`);
      const finNueva = new Date(inicioNueva);
      finNueva.setMinutes(inicioNueva.getMinutes() + ruta[0].duracion);


      const guiasOcupados = new Set<number>();
      reservas.forEach(reserva => {

        if (reserva.guia != null) {
          const inicioReserva = new Date(`${reserva.fecha}T${reserva.hora}`);
          const finReserva = new Date(inicioReserva);
          finReserva.setMinutes(inicioReserva.getMinutes() + ruta[0].duracion);

          const seSolapan = inicioNueva < finReserva && finNueva > inicioReserva;

          if (seSolapan) {
            guiasOcupados.add(reserva.guia.id);
          }
        }

      });

      return guias.filter(g => !guiasOcupados.has(g.id));

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error al obtener guías disponibles');
    }
  }

  async asignarGuia(body: any) {
    console.log(body)
    try {
      let reserva = await this.reservasRepository.findOneBy({id:body.idReserva})
      if (reserva) {
        reserva.guia = body.idGuia
        return this.reservasRepository.save(reserva)
      }

    } catch (error) {
      console.log(error)
    }
  }
  async create(createReservaDto: CreateReservaDto, user: number) {
    console.log(createReservaDto)
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

    if (!cliente) {
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

  async maximoPorTipo(tipo: string) {
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
