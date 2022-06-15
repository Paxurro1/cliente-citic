import { mensajeResponse } from "./mensajeResponse";


export class Mensaje {

  static mensajeJSON(obj: mensajeResponse) {
    return new Mensaje(
      obj['email_origen'],
      obj['email_destino'],
      obj['texto'],
      obj['leido'],
    );
  }

  constructor(
    public email_origen: string,
    public email_destino: string,
    public texto: string,
    public leido: string,
  ) { }

}
