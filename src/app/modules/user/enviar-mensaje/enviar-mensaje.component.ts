import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Usuario } from 'src/app/models/usuario';
import { MensajesService } from 'src/app/services/mensajes.service';
import { EmailStorageEmailService } from 'src/app/services/email.storageEmail.service';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.scss']
})
export class EnviarMensajeComponent implements OnInit {

  usuario?: Usuario;
  mensaje: FormGroup;
  submitted: boolean = false;
  public emailAntiguo?: string;
  emailUsuario?: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private mensajeService: MensajesService,
    private storageUser: LoginStorageUserService,
    private storageEmail: EmailStorageEmailService,
  ) {
    this.usuario = storageUser.getUser();
    this.emailUsuario = storageEmail.getEmail();
    this.mensaje = this.formBuilder.group({
      texto: ['', Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(200)])
      ],
    }
    );
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (!this.mensaje.valid) {
      return;
    }
    var datos = {
      'email_origen': this.usuario?.email,
      'email_destino': this.emailUsuario,
      'texto': this.mensaje.value.texto,
    }
    // console.log(datos);
    this.mensajeService.enviarMensaje(datos).subscribe({
      next: (respuesta: any) => {
        this.toastr.success('Mensaje enviado.', 'Enviado');
      },
      error: e => {
        console.log(e);
        this.toastr.error('El mensaje no pudo enviarse.', 'Error');
      }
    })
    this.onReset();
  }

  get formulario() {
    return this.mensaje.controls;
  }

  onReset() {
    this.submitted = false;
    this.mensaje.reset();
  }

}
