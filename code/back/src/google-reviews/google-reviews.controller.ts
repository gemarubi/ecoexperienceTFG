import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoogleReviewsService } from './google-reviews.service';
import { CreateGoogleReviewDto } from './dto/create-google-review.dto';
import { UpdateGoogleReviewDto } from './dto/update-google-review.dto';

@Controller('google-reviews')
export class GoogleReviewsController {
  constructor(private readonly googleReviewsService: GoogleReviewsService) {}



  @Get()
  async getRating() {
    const rating = await this.googleReviewsService.getRating();
    return { rating };
  }


}
