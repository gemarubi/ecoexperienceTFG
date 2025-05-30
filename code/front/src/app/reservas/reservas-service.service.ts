import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Intervalo, Reserva, ReservasList } from './interface/interface';
import { FormGroup } from '@angular/forms';
import { User } from '../users/interfaces/user';

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

   getReservas() {

    return this.http.get<ReservasList[]>(this.apiUrl);
  }

  getGuiasLibres(idReserva:number){

    return this.http.get<User[]>(this.apiUrl+'/guias/'+idReserva);
  }

  asignarGuia(body:any){
    console.log(body.idReserva)
    return this.http.post<Reserva>(this.apiUrl+'/asignarGuia',body)
  }
}
