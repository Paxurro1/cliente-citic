import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-elegir-rol',
  templateUrl: './elegir-rol.component.html',
  styleUrls: ['./elegir-rol.component.scss']
})
export class ElegirRolComponent implements OnInit {

  usuario?: Usuario;
  rol: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private perfilService: PerfilService,
    private storageUser: LoginStorageUserService,
  ) {
    this.usuario = storageUser.getUser();
    this.rol = this.formBuilder.group({
      rol: [, Validators.compose([
        Validators.required])
      ],
    }
    );
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (!this.rol.valid) {
      return;
    }
    this.usuario!.rol_activo = this.rol.value.rol
    this.storageUser.setUser(this.usuario!)
    console.log(this.usuario);
    if (this.usuario!.rol_activo == 2) {
      window.location.href = "admin/crud-admin"
    } else {
      window.location.href = "user/dar-like"
    }
  }

  get formulario() {
    return this.rol.controls;
  }

}
