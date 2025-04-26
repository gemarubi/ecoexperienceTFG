import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

 
  async create(createUserDto: CreateUserDto) {
    try {
      const { pass, ...userData } = createUserDto;
      const hashedPassword = await bcrypt.hash(pass, 10);
      const user = this.usersRepository.create({
        ...userData,
        pass: hashedPassword,
      });
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error al crear la persona');
    }
  }


  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error al obtener las personas');
    }
  }


  async findOne(correo: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { correo: correo } });
      if (!user) {
        throw new NotFoundException(`No se encontró ningun usuario con correo ${correo}`);
      }
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(`No se encontró el usuario ${correo}`);
    }
  }

 
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: 1
        }
      } );
  
      if (!user) {
        throw new NotFoundException(`No se encontró ningun usuario con id  ${id}`);
      }
  
      Object.assign(user, updateUserDto); // Mezcla los datos nuevos
      return await this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(`Error al actualizar usuario con id ${id}:`, error);
      throw new NotFoundException(`No se encontró una persona con id ${id}`);
    }
  }
  

  async remove(id: number): Promise<{ borrados: number }> {
    try {
      const result = await this.usersRepository.delete(id);
      
      if (result.affected === 0) {
        throw new NotFoundException(`No se encontró ningun usuario con id ${id}`);
      }
  
      return { borrados: result.affected ?? 0 }; // Devuelve el número de registros eliminados
    } catch (error) {
      this.logger.error(`Error al eliminar al usuario con id ${id}:`, error);
      throw new InternalServerErrorException(`Error al eliminar al usuario con id ${id}`);
    }
  }
  
}