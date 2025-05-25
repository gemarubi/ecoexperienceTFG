import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Reserva } from './interface/interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReservasServiceService {

 private apiUrl = `${environment.apiUrl}/reservas`;

  constructor(private http: HttpClient) {}

  getDiasOcupados(rutaTipo:string) {
    return this.http.get<string[]>(this.apiUrl+'/nodisponibles/'+rutaTipo);
  }
  createReserva(reserva:Reserva){

    return this.http.post<FormGroup>(this.apiUrl,reserva)
  }
}
