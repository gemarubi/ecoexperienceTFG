import { Test, TestingModule } from '@nestjs/testing';
import { TuktuksController } from './tuktuks.controller';
import { TuktuksService } from './tuktuks.service';

describe('TuktuksController', () => {
  let controller: TuktuksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TuktuksController],
      providers: [TuktuksService],
    }).compile();

    controller = module.get<TuktuksController>(TuktuksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
