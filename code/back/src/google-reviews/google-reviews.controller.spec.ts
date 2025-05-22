import { Test, TestingModule } from '@nestjs/testing';
import { GoogleReviewsController } from './google-reviews.controller';
import { GoogleReviewsService } from './google-reviews.service';

describe('GoogleReviewsController', () => {
  let controller: GoogleReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleReviewsController],
      providers: [GoogleReviewsService],
    }).compile();

    controller = module.get<GoogleReviewsController>(GoogleReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
