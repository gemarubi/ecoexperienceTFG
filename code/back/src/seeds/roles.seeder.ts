import { Role } from '../roles/entities/role.entity';
import { DataSource } from 'typeorm';

export const seedRoles = async (dataSource: DataSource) => {
  const roleRepo = dataSource.getRepository(Role);

  const rolesData = ['Admin', 'Cliente', 'Guía'].map((descripcion) =>
    roleRepo.create({ descripcion }),
  );

  await roleRepo.save(rolesData);
 
};