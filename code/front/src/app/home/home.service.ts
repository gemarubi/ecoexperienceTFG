import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ruta } from './interfaces/ruta';
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
}
