import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../services/login.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public logo: string;
  login: FormGroup;
  submitted: boolean = false;
  usuario!: Usuario;

  constructor(
    private LoginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private storageUser: LoginStorageUserService,
  ) {
    this.logo="./assets/logo.png";
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get formulario() {
    return this.login.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.login.valid) {
      return;
    }
    var datos = {
      'email': this.login.value.email,
      'pass': this.login.value.password
    }
    this.LoginService.login(datos).subscribe({
      next: (usuario: any) => {
        this.usuario = usuario;
        console.log(this.usuario);
        this.toastr.success('Login realizado con éxito.', 'Login')
        this.ponerRol();
        this.storageUser.setUser(this.usuario)
        console.log(this.usuario);
        if (this.usuario.rol_activo == 2) {
          window.location.href = "admin/crud-admin"
        } else if (this.usuario.rol_activo == 1) {
          window.location.href = "user/dar-like"
        }
      },
      error: e => {
        this.toastr.error('Datos de inicio de sesión incorrectos. O el usuario aún no está activo.', 'Error')
      }
    });
    this.onReset();
  }

  public ponerRol() {
    if (this.isAdministrador()) {
      this.usuario.rol_activo = 2
    } else if (this.isUsuario()) {
      this.usuario.rol_activo = 1
    }
  }

  public isAdministrador(): boolean {
    return this.usuario.roles!.find(rol => rol.id_rol === 2) != undefined;
  }


  public isUsuario(): boolean {
    return this.usuario.roles!.find(rol => rol.id_rol === 1) != undefined;
  }

  onReset() {
    this.submitted = false;
    this.login.reset();
  }

}
