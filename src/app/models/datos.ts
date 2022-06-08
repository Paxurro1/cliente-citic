import { datosResponse } from "./datosResponse";


export class Datos {

  static datosJSON(obj: datosResponse) {
    return new Datos(
      obj['f_nac'],
      obj['ciudad'],
      obj['descripcion'],
      obj['tipo_relacion'],
      obj['tieneHijos'],
      obj['quiereHijos'],
      obj['id_genero'],
    );
  }

  constructor(
    public f_nac: Date,
    public ciudad: string,
    public descripcion: string,
    public tipo_relacion: string,
    public tieneHijos: number,
    public quiereHijos: number,
    public id_genero: number,
  ) { }

}
