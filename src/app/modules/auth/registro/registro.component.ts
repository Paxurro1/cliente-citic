import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { registroService } from 'src/app/services/registro.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registro: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private registroService: registroService,
  ) {
    this.registro = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email])
      ],
      nombre: ['', Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(20)])
      ],
      pass1: ['', Validators.compose([
        Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{8,30})')])
      ],
      pass2: ['', Validators.compose([
        Validators.required])
      ],
      ciudad: ['', Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(30)])
      ],
      desc: ['', Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(200)])
      ],
      date: ['', Validators.compose([
        Validators.required])
      ],
      sexo: ['', Validators.compose([
        Validators.required])
      ],
      tipoRelacion: ['', Validators.compose([
        Validators.required])
      ],
      tieneHijos: ['', Validators.compose([
        Validators.required])
      ],
      quiereHijos: ['', Validators.compose([
        Validators.required])
      ],
      deporte: ['', Validators.compose([
        Validators.required])
      ],
      arte: ['', Validators.compose([
        Validators.required])
      ],
      politica: ['', Validators.compose([
        Validators.required])
      ],
      musica: ['', Validators.compose([
        Validators.required])
      ],
      viajar: ['', Validators.compose([
        Validators.required])
      ],
      sexualidad: ['', Validators.compose([
        Validators.required])
      ],
    },
      {
        validator: [this.passwordMatchValidator, this.esMenor]
      }
    );
  }

  ngOnInit(): void {
  }

  esMenor(control: AbstractControl) {
    const fechaNacimiento = new Date(control.get('date')?.value);
    let timeDiff = Math.abs(Date.now() - fechaNacimiento.getTime());
    if (Math.floor((timeDiff / (1000 * 3600 * 24)) / 365) < 18) {
      control.get('date')?.setErrors({ esMenor: true });
    }
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('pass1')?.value;
    const confirmPassword: string = control.get('pass2')?.value;
    if (password !== confirmPassword) {
      control.get('pass2')?.setErrors({ NoPassswordMatch: true });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.registro.valid) {
      return;
    }
    var datos = {
      'email': this.registro.value.email,
      'nombre': this.registro.value.nombre,
      'pass': this.registro.value.pass1,
      'ciudad': this.registro.value.ciudad,
      'desc': this.registro.value.desc,
      'date': this.registro.value.date,
      'sexo': this.registro.value.sexo,
      'tipoRelacion': this.registro.value.tipoRelacion,
      'tieneHijos': this.registro.value.tieneHijos,
      'quiereHijos': this.registro.value.quiereHijos,
      'deporte': this.registro.value.deporte,
      'arte': this.registro.value.arte,
      'politica': this.registro.value.politica,
      'musica': this.registro.value.musica,
      'viajar': this.registro.value.viajar,
      'sexualidad': this.registro.value.sexualidad,
    }
    console.log(datos);
    this.registroService.registro(datos).subscribe({
      next: (res) => {
        this.toastr.success('Usuario registrado.', 'Registro');
      },
      error: e => {
        // console.log(e);
        this.toastr.error('El usuario no ha podido registrarse.', 'Error');
      }
    })
    // console.log(datos);
    // this.onReset();
  }

  get formulario() {
    return this.registro.controls;
  }

  onReset() {
    this.submitted = false;
    this.registro.reset();
  }

}
