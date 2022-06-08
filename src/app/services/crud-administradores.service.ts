import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usuarioResponse } from '../models/usuarioRespose';
import { usuarioModificadoResponse } from '../models/usuarioModificadoResponse';

@Injectable({
  providedIn: 'root'
})
export class CrudAdministradoresService {
  @Output() usuarioTrigger: EventEmitter<any> = new EventEmitter();
  public ruta: string = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  public getUsuarios() {
    let url: string = this.ruta + 'getUsuarios';
    return this.http.get<usuarioModificadoResponse[]>(url);
  }

  public borrarUsuario(email: string) {
    let url: string = this.ruta + 'borrarUsuario/' + email;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(url, { headers });
  }

  public editarUsuario(datos: object) {
    let url: string = this.ruta + "editarUsuario";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

}
