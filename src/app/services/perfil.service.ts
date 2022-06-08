import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Datos } from '../models/datos';
import { Preferencias } from '../models/preferencias';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  public ruta: string = "http://localhost:8000/api/";
  constructor(private http: HttpClient,) { }

  public editarPerfil(datos: object) {
    let url: string = this.ruta + "editarPerfil";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

  public camibiarPass(datos: object) {
    let url: string = this.ruta + "cambiarPass";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

  public getDatos(email: string) {
    let url: string = this.ruta + 'getDatos/' + email;
    return this.http.get<Datos>(url);
  }

  public getPreferencias(email: string) {
    let url: string = this.ruta + 'getPreferencias/' + email;
    return this.http.get<Preferencias>(url);
  }

  public cerrarSesion(email: string) {
    let url: string = this.ruta + 'cerrarSesion/' + email;
    return this.http.get(url);
  }

  public editarPreferencias(datos: object) {
    let url: string = this.ruta + "editarPreferencias";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }
}
