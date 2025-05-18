import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Reserva } from 'src/reservas/entities/reserva.entity';
import { Ruta } from 'src/rutas/entities/ruta.entity';
import { TukTuk } from 'src/tuktuks/entities/tuktuk.entity';

dotenv.config();
console.log('✅ data-source.ts cargado');
const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [User, Role,Reserva, Ruta, TukTuk],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
export default AppDataSource
