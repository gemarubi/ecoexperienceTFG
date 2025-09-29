import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Role } from './src/roles/entities/role.entity';
import { Reserva } from './src/reservas/entities/reserva.entity';
import { Ruta } from './src/rutas/entities/ruta.entity';
import { TukTuk } from './src/tuktuks/entities/tuktuk.entity';

// ⚡ Solo cargar dotenv en local (no en producción)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log('✅ data-source.ts cargado con: ', {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});

const AppDataSource = new DataSource({
  type: 'postgres',
   host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER ,
  password: process.env.DB_PASS ,
  database: process.env.DB_DATABASE ,
  entities: [User, Role, Reserva, Ruta, TukTuk],
  migrations: [
    'dist/migrations/*.js', // en producción
    'src/migrations/*.ts',  // en desarrollo
  ],
  synchronize: true,
  logging: true,
});

export default AppDataSource;