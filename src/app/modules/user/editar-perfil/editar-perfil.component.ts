import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Usuario } from 'src/app/models/usuario';
import { Datos } from 'src/app/models/datos';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  usuario?: Usuario;
  editar: FormGroup;
  submitted: boolean = false;
  public emailAntiguo?: string;
  datos?: Datos;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private perfilService: PerfilService,
    private storageUser: LoginStorageUserService,
  ) {
    this.usuario = storageUser.getUser();
    this.editar = this.formBuilder.group({});
    this.editar = this.formBuilder.group({
      email: [this.usuario?.email, Validators.compose([
        Validators.required, Validators.email])
      ],
      nombre: [this.usuario?.nombre, Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(20)])
      ],
      date: [this.datos?.f_nac, Validators.compose([
        Validators.required])
      ],
      ciudad: [this.datos?.ciudad, Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(30)])
      ],
      desc: [this.datos?.descripcion, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(200)])
      ],
      tipo_relacion: this.formBuilder.array([], [Validators.required]),
      tiene_hijos: this.formBuilder.array([], [Validators.required]),
    },
      {
        validator: [this.esMenor]
      }
    );
  }

  ngOnInit(): void {
    this.emailAntiguo = this.usuario?.email;
    this.getDatos();
  }

  construirFormulario() {
    this.editar = this.formBuilder.group({
      email: [this.usuario?.email, Validators.compose([
        Validators.required, Validators.email])
      ],
      nombre: [this.usuario?.nombre, Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(20)])
      ],
      date: [this.datos?.f_nac, Validators.compose([
        Validators.required])
      ],
      ciudad: [this.datos?.ciudad, Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(30)])
      ],
      desc: [this.datos?.descripcion, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(200)])
      ],
      tipo_relacion: this.formBuilder.array([], [Validators.required]),
      tiene_hijos: this.formBuilder.array([], [Validators.required]),
      quiere_hijos: this.formBuilder.array([], [Validators.required]),
      sexo: this.formBuilder.array([], [Validators.required]),
    },
      {
        validator: [this.esMenor]
      }
    );
  }

  marcarEsporadica() {
    const checkArray: FormArray = this.editar.get('tipo_relacion') as FormArray;
    let activo = document.querySelectorAll('#esporadica input') as NodeListOf<HTMLInputElement>;
    // console.log(this.datos?.tipo_relacion)
    if (this.datos?.tipo_relacion == 'Esporádica') {
      // console.log('entra')
      activo.forEach((element: { checked: any; value: string; }) => {
        checkArray.push(new FormControl(element.value));
        element.checked = true;
      });
    }
  }

  marcarSeria() {
    const checkArray: FormArray = this.editar.get('tipo_relacion') as FormArray;
    let activo = document.querySelectorAll('#seria input') as NodeListOf<HTMLInputElement>;
    if (this.datos?.tipo_relacion == 'Seria') {
      activo.forEach((element: { checked: any; value: string; }) => {
        checkArray.push(new FormControl(element.value));
        element.checked = true;
      });
    }
  }

  marcarIndiferente() {
    const checkArray: FormArray = this.editar.get('tipo_relacion') as FormArray;
    let activo = document.querySelectorAll('#indiferente input') as NodeListOf<HTMLInputElement>;
    if (this.datos?.tipo_relacion == 'Indiferente') {
      activo.forEach((element: { checked: any; value: string; }) => {
        checkArray.push(new FormControl(element.value));
        element.checked = true;
      });
    }
  }

  marcarTiene() {
    const checkArray: FormArray = this.editar.get('tiene_hijos') as FormArray;
    let activo = document.querySelectorAll('#tiene input') as NodeListOf<HTMLInputElement>;
    if (this.datos?.tieneHijos == 0) {
      activo.forEach((element: { checked: any; value: string; }) => {
        checkArray.push(new FormControl(element.value));
        element.checked = true;
      });
    }
  }

  marcarNoTiene() {
    const checkArray: FormArray = this.editar.get('tiene_hijos') as FormArray;
    let activo = document.querySelectorAll('#noTiene input') as NodeListOf<HTMLInputElement>;
    if (this.datos?.tieneHijos == 1) {
      activo.forEach((element: { checked: any; value: string; }) => {
        checkArray.push(new FormControl(element.value));
        element.checked = true;
      });
    }
  }

  marcarQuiere() {
    const checkArray: FormArray = this.editar.get('quiere_hijos') as FormArray;
    let activo = document.querySelectorAll('#quiere input') as NodeListOf<HTMLInputElement>;
    if (this.datos?.quiereHijos == 0) {
      activo.forEach((element: { checked: any; value: string; }) => {
        checkArray.push(new FormControl(element.value));
        element.checked = true;
      });
    }
  }

  marcarNoQuiere() {
    const checkArray: FormArray = this.editar.get('quiere_hijos') as FormArray;
    let activo = document.querySelectorAll('#noQuiere input') as NodeListOf<HTMLInputElement>;
    if (this.datos?.quiereHijos == 1) {
      activo.forEach((element: { checked: any; value: string; }) => {
        checkArray.push(new FormControl(element.value));
        element.checked = true;
      });
    }
  }

  marcarHombre() {
    const checkArray: FormArray = this.editar.get('sexo') as FormArray;
    let activo = document.querySelectorAll('#hombre input') as NodeListOf<HTMLInputElement>;
    if (this.datos?.id_genero == 1) {
      activo.forEach((element: { checked: any; value: string; }) => {
        checkArray.push(new FormControl(element.value));
        element.checked = true;
      });
    }
  }

  marcarMujer() {
    const checkArray: FormArray = this.editar.get('sexo') as FormArray;
    let activo = document.querySelectorAll('#mujer input') as NodeListOf<HTMLInputElement>;
    if (this.datos?.id_genero == 2) {
      activo.forEach((element: { checked: any; value: string; }) => {
        checkArray.push(new FormControl(element.value));
        element.checked = true;
      });
    }
  }

  esporadicaChange(e: any) {
    const checkArray: FormArray = this.editar.get('tipo_relacion') as FormArray;
    if (e.target.checked) {
      checkArray.clear();
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  seriaChange(e: any) {
    const checkArray: FormArray = this.editar.get('tipo_relacion') as FormArray;
    if (e.target.checked) {
      checkArray.clear();
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  indiferenteChange(e: any) {
    const checkArray: FormArray = this.editar.get('tipo_relacion') as FormArray;
    if (e.target.checked) {
      checkArray.clear();
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  tieneChange(e: any) {
    const checkArray: FormArray = this.editar.get('tiene_hijos') as FormArray;
    if (e.target.checked) {
      checkArray.clear();
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  noTieneChange(e: any) {
    const checkArray: FormArray = this.editar.get('tiene_hijos') as FormArray;
    if (e.target.checked) {
      checkArray.clear();
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  quiereChange(e: any) {
    const checkArray: FormArray = this.editar.get('quiere_hijos') as FormArray;
    if (e.target.checked) {
      checkArray.clear();
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  noQuiereChange(e: any) {
    const checkArray: FormArray = this.editar.get('quiere_hijos') as FormArray;
    if (e.target.checked) {
      checkArray.clear();
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  hombreChange(e: any) {
    const checkArray: FormArray = this.editar.get('sexo') as FormArray;
    if (e.target.checked) {
      checkArray.clear();
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  mujerChange(e: any) {
    const checkArray: FormArray = this.editar.get('sexo') as FormArray;
    if (e.target.checked) {
      checkArray.clear();
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  esMenor(control: AbstractControl) {
    const fechaNacimiento = new Date(control.get('date')?.value);
    let timeDiff = Math.abs(Date.now() - fechaNacimiento.getTime());
    if (Math.floor((timeDiff / (1000 * 3600 * 24)) / 365) < 18) {
      control.get('date')?.setErrors({ esMenor: true });
    }
  }

  getDatos() {
    this.perfilService.getDatos(this.usuario!.email).subscribe((response) => {
      this.datos = response;
      // console.log(this.datos)
      this.construirFormulario();
      this.marcarEsporadica();
      this.marcarIndiferente();
      this.marcarSeria();
      this.marcarTiene();
      this.marcarNoTiene();
      this.marcarQuiere();
      this.marcarNoQuiere();
      this.marcarHombre();
      this.marcarMujer();
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editar.valid) {
      return;
    }
    var datos = {
      'emailAntiguo': this.emailAntiguo,
      'email': this.editar.value.email,
      'nombre': this.editar.value.nombre,
      'date': this.editar.value.date,
      'ciudad': this.editar.value.ciudad,
      'desc': this.editar.value.desc,
      'relacion': this.editar.value.tipo_relacion,
      'tiene_hijos': this.editar.value.tiene_hijos,
      'quiere_hijos': this.editar.value.quiere_hijos,
      'sexo': this.editar.value.sexo,
    }
    // console.log(datos);
    this.perfilService.editarPerfil(datos).subscribe({
      next: (usuario: any) => {
        this.usuario = usuario;
        this.ponerRol();
        this.storageUser.setUser(this.usuario!)
        console.log(this.usuario)
        this.toastr.success('Perfil editado.', 'Registro');
      },
      error: e => {
        console.log(e);
        this.toastr.error('Error al editar el perfil.', 'Error');
      }
    })
    // console.log(datos);
    // this.onReset();
  }

  get formulario() {
    return this.editar.controls;
  }

  onReset() {
    this.submitted = false;
    this.editar.reset();
  }

  salir() {
    this.perfilService.cerrarSesion(this.usuario!.email).subscribe((response) => {
      this.toastr.warning('Has cerrado sesión.', 'AVISO')
      this.storageUser.removeUser()
      window.location.href = ""
    });
  }

  cambiarPass() {
    this.navegar('user/cambiar-pass', { queryParams: '' })
  }

  elegirRol() {
    this.navegar('user/elegir-rol', { queryParams: '' })
  }

  cambiarPreferencias() {
    this.navegar('user/cambiar-preferencias', { queryParams: '' })
  }

  navegar(route?: string, params?: any): void {
    this.router.navigate([route], params);
  }

  public ponerRol() {
    if (this.isAdministrador()) {
      this.usuario!.rol_activo = 2
    } else {
      this.usuario!.rol_activo = 1
    }
  }

  public isAdministrador(): boolean {
    return this.usuario!.roles!.find(rol => rol.id_rol === 2) != undefined;
  }


  public isUsuario(): boolean {
    return this.usuario!.roles?.find(rol => rol.id_rol === 1) != undefined;
  }

}
