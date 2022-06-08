import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Afines } from '../models/afines';

@Injectable({
  providedIn: 'root'
})
export class PersonasAfinesService {
  public ruta: string = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  public establecerAfinidades(email: string) {
    let url: string = this.ruta + 'establecerAfinidades/' + email;
    return this.http.get(url);
  }

  public getAfines(email: string) {
    let url: string = this.ruta + 'getAfines/' + email;
    return this.http.get<Afines[]>(url);
  }

  public like(email: string, emailLike: string) {
    let url: string = this.ruta + 'like/' + email + "/" + emailLike;
    return this.http.get<Afines[]>(url);
  }

  public dislike(email: string, emailLike: string) {
    let url: string = this.ruta + 'dislike/' + email + "/" + emailLike;
    return this.http.get<Afines[]>(url);
  }

}
