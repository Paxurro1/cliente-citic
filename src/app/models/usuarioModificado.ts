import { usuarioModificadoResponse } from "./usuarioModificadoResponse";


export class UsuarioModificado {

  static usuarioJSON(obj: usuarioModificadoResponse) {
    return new UsuarioModificado(
      obj['email'],
      obj['nombre'],
      obj['activo'],
      obj['roles'],
    );
  }

  constructor(
    public email: string,
    public nombre: string,
    public activo: number,
    public roles?: Array<any>,
  ) { }

}
