import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Intervalo, Reserva } from './interface/interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReservasServiceService {

 private apiUrl = `${environment.apiUrl}/reservas`;

  constructor(private http: HttpClient) {}

  getIntervalosOcupados(rutaTipo:string) {
    console.log(rutaTipo)
    return this.http.get<Intervalo[]>(this.apiUrl+'/nodisponibles/'+rutaTipo);
  }
  createReserva(reserva:Reserva){
    console.log(reserva)
    return this.http.post<FormGroup>(this.apiUrl,reserva)
  }
}
