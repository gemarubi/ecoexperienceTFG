import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import AppDataSource from 'data-source';
import { runSeeds } from './seeds/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.useGlobalPipes(new ValidationPipe({  
    whitelist: true,
    transform: true 
  }));
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
const port = process.env.PORT || 3000;
await app.listen(port, '0.0.0.0');

  try {
    const dataSource = await AppDataSource.initialize();

    const rolesCount = await dataSource.getRepository('roles').count();
    if (rolesCount === 0) {
      console.log('🚀 Ejecutando seed inicial...');
      await runSeeds();
      console.log('✅ Seed ejecutado correctamente');
    } else {
      console.log('📦 Seed omitido (la DB ya tiene datos)');
    }

    await dataSource.destroy();
  } catch (err) {
    console.error('❌ Error ejecutando seed:', err);
  }

}
bootstrap();
