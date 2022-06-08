import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Afines } from '../models/afines';
import { Amigos } from '../models/amigos';

@Injectable({
  providedIn: 'root'
})
export class AmigosService {
  public ruta: string = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  public establecerAmigos(email: string) {
    let url: string = this.ruta + 'establecerAmigos/' + email;
    return this.http.get(url);
  }

  public getAmigos(email: string) {
    let url: string = this.ruta + 'getAmigos/' + email;
    return this.http.get<Amigos[]>(url);
  }

  public borrarAmigo(email: string, emailAmigo: string) {
    let url: string = this.ruta + 'borrarAmigo/' + email + "/" + emailAmigo;
    return this.http.get(url);
  }

}
