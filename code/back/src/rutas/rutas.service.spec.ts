import { Test, TestingModule } from '@nestjs/testing';
import { RutasService } from './rutas.service';

describe('RutasService', () => {
  let service: RutasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RutasService],
    }).compile();

    service = module.get<RutasService>(RutasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
