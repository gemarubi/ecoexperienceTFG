import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [User, Role],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});