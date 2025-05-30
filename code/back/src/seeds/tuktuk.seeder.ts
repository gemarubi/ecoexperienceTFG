import { TukTuk } from 'src/tuktuks/entities/tuktuk.entity';
import { Role } from '../roles/entities/role.entity';
import { DataSource } from 'typeorm';

export const seedTuktuk = async (dataSource: DataSource) => {
  const tuktukRepo = dataSource.getRepository(TukTuk);

  const tuktukData = ['0515MZL'].map((matricula) =>
    tuktukRepo.create({ matricula }),
  );

  await tuktukRepo.save(tuktukData);
 
};