import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepo = dataSource.getRepository(User);
  const roleRepo = dataSource.getRepository(Role);

  const adminRole = await roleRepo.findOneBy({ descripcion: 'Admin' });
  if (!adminRole) throw new Error('Rol Admin no encontrado');

  const hashedPass = await bcrypt.hash('1234', 10);

  const adminUser = userRepo.create({
    nombre: 'Admin',
    apellidos: 'User',
    correo: 'admin@nest.com',
    pass: hashedPass,
    pais: 'España',
    tlfno: '666666666',
    roles: [adminRole],
  });

  await userRepo.save(adminUser);
  
};