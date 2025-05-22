import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtro, Ruta } from './interfaces/ruta';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = environment.apiUrl+'/rutas';

  constructor(private http: HttpClient) {}

  getAllRutas(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(this.apiUrl);
  }
   getFiltered(filtros:Filtro): Observable<Ruta[]> {
    return this.http.post<Ruta[]>(this.apiUrl, filtros);
  }

   getRating(): Observable<{ rating: number }> {
    return this.http.get<{ rating: number }>(environment.apiUrl+'/google-reviews');
  }
}
