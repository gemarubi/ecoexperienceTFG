import { PartialType } from '@nestjs/mapped-types';
import { CreateGoogleReviewDto } from './create-google-review.dto';

export class UpdateGoogleReviewDto extends PartialType(CreateGoogleReviewDto) {}
