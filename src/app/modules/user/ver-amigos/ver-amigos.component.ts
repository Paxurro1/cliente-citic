import { AfterViewInit, OnDestroy, Component, OnInit, ViewChild } from '@angular/core';
import { AmigosService } from 'src/app/services/amigos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Usuario } from 'src/app/models/usuario';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Amigos } from 'src/app/models/amigos';
import { EmailStorageEmailService } from 'src/app/services/email.storageEmail.service';

@Component({
  selector: 'app-ver-amigos',
  templateUrl: './ver-amigos.component.html',
  styleUrls: ['./ver-amigos.component.scss']
})
export class VerAmigosComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement?: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  usuario?: Usuario;
  amigos: Amigos[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private amigosService: AmigosService,
    private storageUser: LoginStorageUserService,
    private storageEmail: EmailStorageEmailService,
  ) {
    this.usuario = storageUser.getUser();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.amigos);
  }

  ngOnInit(): void {
    this.establecerAmigos();
    $.extend(true, $.fn.dataTable.defaults, {
      "language": { "url": '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' }
    })
    this.getAmigos()
  }

  rerender(): void {
    this.dtElement!.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  establecerAmigos() {
    this.amigosService.establecerAmigos(this.usuario!.email).subscribe((response) => {
    });
  }

  getAmigos() {
    this.amigosService.getAmigos(this.usuario!.email).subscribe((response) => {
      this.amigos = response;
      // console.log(this.amigos);
      this.rerender();
      this.dtTrigger.next(this.amigos);
      $.fn.dataTable.ext.errMode = 'throw';
    });
  }

  borrarAmigo(email: string) {
    console.log(email)
    this.amigosService.borrarAmigo(this.usuario!.email, email).subscribe({
      next: (res) => {
        this.toastr.success('Amigo eliminado.', 'Eliminado');
        this.getAmigos();
      },
      error: e => {
        console.log(e);
        this.toastr.error('El amigo no ha podido ser eliminado.', 'Error');
      }
    })
  }

  verMensajes(email: string) {
    this.storageEmail.setEmail(email);
    this.router.navigate(['user/ver-mensajes']);
  }

}
