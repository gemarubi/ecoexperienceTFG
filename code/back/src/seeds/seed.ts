import AppDataSource from '../../data-source';
import { seedRoles } from './roles.seeder';
import { seedRutas } from './rutas.seeder';
import { seedUsers } from './users.seeder';

async function runSeeds() {
  await AppDataSource.initialize();


  await seedRoles(AppDataSource);
  await seedUsers(AppDataSource);
  await seedRutas(AppDataSource);
  await AppDataSource.destroy();
  
}

runSeeds().catch((err) => {
  console.error( err);
  process.exit(1);
});