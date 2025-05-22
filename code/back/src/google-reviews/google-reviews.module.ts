import { Module } from '@nestjs/common';
import { GoogleReviewsService } from './google-reviews.service';
import { GoogleReviewsController } from './google-reviews.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [GoogleReviewsController],
   imports: [
    HttpModule,
    ConfigModule
  ],
  providers: [GoogleReviewsService],
    exports: [GoogleReviewsService],
})
export class GoogleReviewsModule {}
