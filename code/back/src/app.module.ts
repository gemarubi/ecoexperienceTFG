import { App } from 'supertest/types';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppDataSource } from '../data-source';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [ ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule,
    RolesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
