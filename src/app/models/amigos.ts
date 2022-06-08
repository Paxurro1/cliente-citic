import { amigosResponse } from "./amigosResponse";


export class Amigos {

  static amigosJSON(obj: amigosResponse) {
    return new Amigos(
      obj['email'],
      obj['nombre'],
      obj['conectado'],
      obj['id_genero'],
    );
  }

  constructor(
    public email: string,
    public nombre: string,
    public conectado: number,
    public id_genero: number,
  ) { }

}
