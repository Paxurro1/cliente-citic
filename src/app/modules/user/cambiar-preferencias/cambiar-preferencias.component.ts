import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Usuario } from 'src/app/models/usuario';
import { Preferencias } from 'src/app/models/preferencias';

@Component({
  selector: 'app-cambiar-preferencias',
  templateUrl: './cambiar-preferencias.component.html',
  styleUrls: ['./cambiar-preferencias.component.scss']
})
export class CambiarPreferenciasComponent implements OnInit {

  usuario?: Usuario;
  editar: FormGroup;
  submitted: boolean = false;
  public emailAntiguo?: string;
  preferencias?: Preferencias;

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
      deporte: [this.preferencias?.deporte, Validators.compose([
        Validators.required])
      ],
      arte: [this.preferencias?.deporte, Validators.compose([
        Validators.required])
      ],
      politica: [this.preferencias?.deporte, Validators.compose([
        Validators.required])
      ],
      musica: [this.preferencias?.deporte, Validators.compose([
        Validators.required])
      ],
      viajar: [this.preferencias?.deporte, Validators.compose([
        Validators.required])
      ],
      checkArray: this.formBuilder.array([], [Validators.required]),
    }
    );
  }

  ngOnInit(): void {
    this.emailAntiguo = this.usuario?.email;
    this.getPreferencias();
  }

  construirFormulario() {
    this.editar = this.formBuilder.group({
      deporte: [this.preferencias?.deporte, Validators.compose([
        Validators.required])
      ],
      arte: [this.preferencias?.arte, Validators.compose([
        Validators.required])
      ],
      politica: [this.preferencias?.politica, Validators.compose([
        Validators.required])
      ],
      musica: [this.preferencias?.musica, Validators.compose([
        Validators.required])
      ],
      viajar: [this.preferencias?.viajar, Validators.compose([
        Validators.required])
      ],
      checkArray: this.formBuilder.array([], [Validators.required]),
    }
    );
  }

  getPreferencias() {
    this.perfilService.getPreferencias(this.usuario!.email).subscribe((response) => {
      this.preferencias = response;
      // console.log(this.preferencias)
      this.construirFormulario();
      this.marcarSexualidad();
    });
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.editar.get('checkArray') as FormArray;
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

  marcarSexualidad() {
    const checkArray: FormArray = this.editar.get('checkArray') as FormArray;
    let rolesAux = document.querySelectorAll('#sexualidad input') as NodeListOf<HTMLInputElement>;
    this.preferencias?.gusto_genero!.forEach((r: any) => {
      rolesAux.forEach((element: { checked: any; value: string; }) => {
        // console.log(r.id_genero)
        // console.log(element)
        if (element) {
          let elemento = parseInt(element.value);
          // console.log(elemento)
          if (r.id_genero == elemento) {
            // console.log('entro')
            element.checked = true;
            // console.log(element.value)
            checkArray.push(new FormControl(element.value));
          }
        }
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editar.valid) {
      return;
    }
    var datos = {
      'emailAntiguo': this.emailAntiguo,
      'deporte': this.editar.value.deporte,
      'arte': this.editar.value.arte,
      'politica': this.editar.value.politica,
      'musica': this.editar.value.musica,
      'viajar': this.editar.value.viajar,
      'sexualidad': this.editar.value.checkArray,
    }
    // console.log(datos);
    this.perfilService.editarPreferencias(datos).subscribe({
      next: (usuario: any) => {
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

}
