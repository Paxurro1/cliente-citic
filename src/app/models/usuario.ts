import { usuarioResponse } from "./usuarioRespose";


export class Usuario {

  static usuarioJSON(obj: usuarioResponse) {
    return new Usuario(
      obj['email'],
      obj['nombre'],
      obj['roles'],
      obj['rol_activo'],
    );
  }

  constructor(
    public email: string,
    public nombre: string,
    public roles?: Array<any>,
    public rol_activo?: number,
  ) { }

  public ponerRol() {
    if (this.isAdministrador()) {
      this.rol_activo = 2
    } else {
      this.rol_activo = 1
    }
  }

  public isAdministrador(): boolean {
    return this.roles!.find(rol => rol.id_rol === 2) != undefined;
  }

  public isUsuario(): boolean {
    return this.roles?.find(rol => rol.id_rol === 1) != undefined;
  }

}
