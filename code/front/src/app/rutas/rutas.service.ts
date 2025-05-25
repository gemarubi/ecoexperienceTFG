import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Filtro, Ruta } from '../home/interfaces/ruta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutasService {
 private apiUrl = `${environment.apiUrl}/rutas`;

  constructor(private http: HttpClient) {}

  getAllRutas() {
    return this.http.get<Ruta[]>(this.apiUrl);
  }

  getRutaById(id: number) {

    return this.http.get<Ruta[]>(`${this.apiUrl}/${id}`);
  }

    getFiltered(filtros:Filtro): Observable<Ruta[]> {
      return this.http.post<Ruta[]>(this.apiUrl, filtros);
    }

}
