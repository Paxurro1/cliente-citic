import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioModificado } from 'src/app/models/usuarioModificado';
import { CrudAdministradoresService } from 'src/app/services/crud-administradores.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {

  datosUsuario: FormGroup;
  submitted: boolean = false;

  public usuarioModificado!: UsuarioModificado;
  public emailAntiguo?: string;

  constructor(
    private modalActive: NgbActiveModal,
    private adminService: CrudAdministradoresService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.datosUsuario = this.formBuilder.group({});

    this.adminService.usuarioTrigger.subscribe({
      next: (data: Array<any>) => {
        this.usuarioModificado = data[0];
        this.construirFormulario();
      },
    });
  }

  ngOnInit(): void {
    this.emailAntiguo = this.usuarioModificado?.email;
    // console.log(this.emailAntiguo);
    this.marcarRoles();
    this.marcarActivo();
    this.marcarInactivo();
  }

  construirFormulario() {
    this.datosUsuario = this.formBuilder.group({
      checkArray: this.formBuilder.array([], [Validators.required]),
      activo: this.formBuilder.array([], [Validators.required]),
      email: [this.usuarioModificado?.email, Validators.compose([
        Validators.required, Validators.email])
      ],
      nombre: [this.usuarioModificado?.nombre, Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(20)])
      ],
    }
    );
  }

  marcarActivo() {
    const checkArray: FormArray = this.datosUsuario.get('activo') as FormArray;
    let activo = document.querySelectorAll('#activoUsuario input') as NodeListOf<HTMLInputElement>;
    if (this.usuarioModificado?.activo == 1) {
      // console.log('activo')
      activo.forEach((element: { checked: any; value: string; }) => {
        // console.log(element)
        checkArray.push(new FormControl(element.value));
        element.checked = true;
      });
    }
  }

  marcarInactivo() {
    const checkArray: FormArray = this.datosUsuario.get('activo') as FormArray;
    let activo = document.querySelectorAll('#inactivoUsuario input') as NodeListOf<HTMLInputElement>;
    if (this.usuarioModificado?.activo == 0) {
      // console.log('inactivo')
      activo.forEach((element: { checked: any; value: string; }) => {
        // console.log(element)
        checkArray.push(new FormControl(element.value));
        element.checked = true;
      });
    }
  }

  marcarRoles() {
    const checkArray: FormArray = this.datosUsuario.get('checkArray') as FormArray;
    let rolesAux = document.querySelectorAll('#rolesUsuario input') as NodeListOf<HTMLInputElement>;
    this.usuarioModificado?.roles!.forEach((r: any) => {
      rolesAux.forEach((element: { checked: any; value: string; }) => {
        // console.log(r)
        // console.log(element)
        if (element) {
          let elemento = parseInt(element.value);
          // console.log(elemento)
          if (r.id_rol == elemento) {
            // console.log('entro')
            element.checked = true;
            // console.log(element.value)
            checkArray.push(new FormControl(element.value));
          }
        }
      });
    });
  }

  onActivoChange(e: any) {
    const checkArray: FormArray = this.datosUsuario.get('activo') as FormArray;
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

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.datosUsuario.get('checkArray') as FormArray;
    if (e.target.checked) {
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

  async closeModal() {
    this.modalActive.close();
  }

  onSubmit() {
    this.submitted = true;
    if (!this.datosUsuario.valid) {
      return;
    }
    var datos = {
      'email': this.datosUsuario.value.email,
      'nombre': this.datosUsuario.value.nombre,
      'roles': this.datosUsuario.value.checkArray,
      'activo': this.datosUsuario.value.activo,
      'emailAntiguo': this.emailAntiguo,
    }
    // console.log(datos)
    this.adminService.editarUsuario(datos).subscribe({
      next: (res) => {
        this.toastr.success('Usuario actualizado.', 'Actualizado');
        this.closeModal();
      },
      error: e => {
        this.toastr.error('El dni o el email ya está registrado', 'Error');
      }
    })
  }

  get formulario() {
    return this.datosUsuario.controls;
  }

}
