import { afinesResponse } from "./afinesResponse";


export class Afines {

  static afinesJSON(obj: afinesResponse) {
    return new Afines(
      obj['email'],
      obj['nombre'],
      obj['f_nac'],
      obj['ciudad'],
      obj['descripcion'],
      obj['tipo_relacion'],
      obj['tieneHijos'],
      obj['quiereHijos'],
      obj['foto'],
      obj['id_genero'],
    );
  }

  constructor(
    public email: string,
    public nombre: string,
    public f_nac: Date,
    public ciudad: string,
    public descripcion: string,
    public tipo_relacion: string,
    public tieneHijos: number,
    public quiereHijos: number,
    public foto: string,
    public id_genero: number,
  ) { }

}
