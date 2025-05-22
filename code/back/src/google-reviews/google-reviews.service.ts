import { Injectable } from '@nestjs/common';
import { CreateGoogleReviewDto } from './dto/create-google-review.dto';
import { UpdateGoogleReviewDto } from './dto/update-google-review.dto';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GoogleReviewsService {
   private apiKey: string;
  private placeId: string;

  constructor(private config: ConfigService, private http: HttpService) {
    this.apiKey = this.config.get('GOOGLE_API_KEY')!;
    this.placeId = this.config.get('GOOGLE_PLACE_ID')!; 
  }

  async getRating(): Promise<number | null> {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&fields=rating&key=${this.apiKey}`;

    try {
      const response = await lastValueFrom(this.http.get(url));
      return response.data.result?.rating || null;
    } catch (error) {
      console.error('Error fetching Google rating:', error.message);
      return null;
    }
  }
}
