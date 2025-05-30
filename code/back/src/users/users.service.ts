import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) { }


  async create(createUserDto: CreateUserDto) {
    try {
      const { pass, roles, ...userData } = createUserDto;
      const hashedPassword = await bcrypt.hash(pass, 10);
      const rolesEntities = await this.rolesRepository.findBy({ id: In(roles) });
      const user = this.usersRepository.create({
        ...userData,
        pass: hashedPassword,
        roles: rolesEntities
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
      return await this.usersRepository.find({
        relations: ['roles'],
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error al obtener las personas');
    }
  }

  async findGuias(): Promise<User[]> {
    try {
      const usuarios = await this.usersRepository.find({
        relations: ['roles'],
      });

      return usuarios.filter(user =>
        user.roles.some(role => role.descripcion === 'Guía')
      );
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error al obtener los guías');
    }
  }
  async findEmail(correo: string): Promise<User> {
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
  async findOne(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { id: id } });
      if (!user) {
        throw new NotFoundException(`No se encontró ningun usuario con id ${id}`);
      }
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(`No se encontró el usuario ${id}`);
    }
  }

  async findAllRolesOfUser(userId: number) {
    try {
      const userWithRoles = await this.usersRepository.findOne({
        where: { id: userId },
        relations: ['roles'],
      });

      if (!userWithRoles) {
        throw new NotFoundException(`No se encontró ningun usuario con id ${userId}`);
      }

      return userWithRoles.roles;
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(`No se encontró el usuario ${userId}`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: id
        },
        relations: ['roles']
      });

      if (!user) {
        throw new NotFoundException(`No se encontró ningun usuario con id  ${id}`);
      }
      const { roles, ...rest } = updateUserDto;
      Object.assign(user, rest);
      const rolesEntities = await this.rolesRepository.findBy({ id: In(updateUserDto.roles!) });
      user.roles = rolesEntities;
      console.log(user)

      return await this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(`Error al actualizar usuario con id ${id}:`, error);
      throw new NotFoundException(`No se encontró una persona con id ${id}`);
    }
  }


  async remove(id: number): Promise<{ borrados: number }> {
    try {
      const result = await this.usersRepository.softDelete(id);

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