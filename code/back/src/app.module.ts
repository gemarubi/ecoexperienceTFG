import { App } from 'supertest/types';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppDataSource } from '../data-source';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [ ConfigModule.forRoot(),
    //Descomentar para hacer migraciones
    //TypeOrmModule.forRoot(AppDataSource.options),
    //Comentar para ejecutar
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UsersModule,
    RolesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
