import { Test, TestingModule } from '@nestjs/testing';
import { TuktuksService } from './tuktuks.service';

describe('TuktuksService', () => {
  let service: TuktuksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TuktuksService],
    }).compile();

    service = module.get<TuktuksService>(TuktuksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
