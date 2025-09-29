import { TukTuk } from 'src/tuktuks/entities/tuktuk.entity';
import { Role } from '../roles/entities/role.entity';
import { DataSource } from 'typeorm';

export const seedTuktuk = async (dataSource: DataSource) => {
  const tuktukRepo = dataSource.getRepository(TukTuk);

  const tuktukData = [ tuktukRepo.create({ matricula: '0515MZL', capacidad: 4 })]

  await tuktukRepo.save(tuktukData);
 
};