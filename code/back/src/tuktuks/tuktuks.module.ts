import { Module } from '@nestjs/common';
import { TuktuksService } from './tuktuks.service';
import { TuktuksController } from './tuktuks.controller';

@Module({
  controllers: [TuktuksController],
  providers: [TuktuksService],
})
export class TuktuksModule {}
