import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Ruta } from 'src/rutas/entities/ruta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { In, Not, Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { TukTuk } from 'src/tuktuks/entities/tuktuk.entity';


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
  async create(createReservaDto: CreateReservaDto) {
     const {
    fecha,
    hora,
    asistentes,
    observaciones,
    clienteId,
    guiaId,
    rutasIds,
  } = createReservaDto;

  const cliente = await this.usersRepository.findOneBy({ id: clienteId });
  const guia = await this.usersRepository.findOneBy({ id: guiaId });
  const rutas = await this.rutasRepository.findBy({ id: In(rutasIds) });

  if (!cliente || !guia) {
    throw new NotFoundException('Cliente o guía no encontrado');
  }


  const reserva = this.reservasRepository.create({
    fecha,
    hora,
    asistentes,
    observaciones,
    cliente,
    guia,
    rutas,
  });

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

  async tuktukLibres(idsReservas:number[]) {

  return await this.tuktuksRepository.find({
  where: {
    reservas: {
      id: Not(In(idsReservas)),
    },
  },
  relations: ['reservas'],
});
  }
  findAll() {
    return `This action returns all reservas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reserva`;
  }

  update(id: number, updateReservaDto: UpdateReservaDto) {
    return `This action updates a #${id} reserva`;
  }

  remove(id: number) {
    return `This action removes a #${id} reserva`;
  }
}
