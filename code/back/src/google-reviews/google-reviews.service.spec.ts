import { Test, TestingModule } from '@nestjs/testing';
import { GoogleReviewsService } from './google-reviews.service';

describe('GoogleReviewsService', () => {
  let service: GoogleReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleReviewsService],
    }).compile();

    service = module.get<GoogleReviewsService>(GoogleReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
