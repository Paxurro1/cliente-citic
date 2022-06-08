import { preferenciasResponse } from "./preferenciasResponse";


export class Preferencias {

  static preferenciasJSON(obj: preferenciasResponse) {
    return new Preferencias(
      obj['deporte'],
      obj['arte'],
      obj['politica'],
      obj['musica'],
      obj['viajar'],
      obj['gusto_genero'],
    );
  }

  constructor(
    public deporte: number,
    public arte: number,
    public politica: number,
    public musica: number,
    public viajar: number,
    public gusto_genero: Array<any>,
  ) { }

}
