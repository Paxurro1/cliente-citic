import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class EmailStorageEmailService {

  public static readonly SESSION_STORAGE_KEY: string = "email";

  email ?: string;

  constructor() { }

  public setEmail(email: string) {
    this.email = email;
    sessionStorage.setItem(EmailStorageEmailService.SESSION_STORAGE_KEY, JSON.stringify(this.email));
    console.log(sessionStorage.getItem(EmailStorageEmailService.SESSION_STORAGE_KEY));
  }

  public getEmail() {
    let email : string | any  = sessionStorage.getItem(EmailStorageEmailService.SESSION_STORAGE_KEY);
    if (email) {
      this.email = email
    }
    return this.email?.replace(/['"]+/g, '')
  }

  public removeEmail() {
    sessionStorage.removeItem(EmailStorageEmailService.SESSION_STORAGE_KEY);
  }
}
