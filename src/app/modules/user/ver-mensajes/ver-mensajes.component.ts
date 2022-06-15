import { Component, OnInit } from '@angular/core';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Mensaje } from 'src/app/models/mensaje';
import { EmailStorageEmailService } from 'src/app/services/email.storageEmail.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ver-mensajes',
  templateUrl: './ver-mensajes.component.html',
  styleUrls: ['./ver-mensajes.component.scss']
})
export class VerMensajesComponent implements OnInit {

  usuario;
  mensajes: Mensaje[] = [];
  emailUsuario?: string;

  constructor(
    private storageUser: LoginStorageUserService,
    private mensajesService: MensajesService,
    private storageEmail: EmailStorageEmailService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.usuario = storageUser.getUser();
    this.emailUsuario = storageEmail.getEmail();
    console.log(this.emailUsuario);
  }

  ngOnInit(): void {
    this.getMensajes();
  }

  getMensajes() {
    this.mensajesService.getMensajes(this.usuario!.email, this.emailUsuario!).subscribe((response) => {
      this.mensajes = response;
      // console.log(this.amigos);
    });
  }

  enviarMensaje() {
    this.router.navigate(['user/enviar-mensaje']);
  }

}
