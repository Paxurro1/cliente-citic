import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Afines } from '../models/afines';
import { Mensaje } from '../models/mensaje';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  public ruta: string = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  public getMensajes(email: string, emailMensaje: string) {
    let url: string = this.ruta + 'getMensajes/' + email + "/" + emailMensaje;
    return this.http.get<Mensaje[]>(url);
  }

  public enviarMensaje(datos: object) {
    let url: string = this.ruta + "enviarMensaje";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }
}
