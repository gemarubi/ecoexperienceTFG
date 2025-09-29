import { App } from 'supertest/types';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { RutasModule } from './rutas/rutas.module';
import { GoogleReviewsModule } from './google-reviews/google-reviews.module';
import { HttpModule } from '@nestjs/axios';
import { ReservasModule } from './reservas/reservas.module';


@Module({
  imports: [ ConfigModule.forRoot(),
    //Descomentar para hacer migraciones
    //TypeOrmModule.forRoot(AppDataSource.options),
    //Comentar para ejecutar
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER ,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
      //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    RutasModule,
    GoogleReviewsModule,
    ReservasModule,
    HttpModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
