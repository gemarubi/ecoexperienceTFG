import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtro, Ruta } from './interfaces/ruta';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}



   getRating(): Observable<{ rating: number }> {
    return this.http.get<{ rating: number }>(environment.apiUrl+'/google-reviews');
  }
}
