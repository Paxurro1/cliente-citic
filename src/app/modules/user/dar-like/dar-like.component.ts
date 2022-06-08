import { Component, OnInit } from '@angular/core';
import { PersonasAfinesService } from 'src/app/services/personas-afines.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Usuario } from 'src/app/models/usuario';
import { Afines } from 'src/app/models/afines';

@Component({
  selector: 'app-dar-like',
  templateUrl: './dar-like.component.html',
  styleUrls: ['./dar-like.component.scss']
})
export class DarLikeComponent implements OnInit {

  usuario?: Usuario;
  public emailAntiguo?: string;
  numeroAfin: number = 0;
  afines: Afines[] = [];
  afin?: Afines;
  foto: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private afinidadService: PersonasAfinesService,
    private storageUser: LoginStorageUserService,
  ) {
    this.usuario = storageUser.getUser();
    this.emailAntiguo = this.usuario?.email;
  }

  ngOnInit(): void {
    this.establecerAfinidades();
    this.getAfines();
  }

  establecerAfinidades() {
    this.afinidadService.establecerAfinidades(this.usuario!.email).subscribe((response) => {
    });
  }

  getAfines() {
    this.afinidadService.getAfines(this.usuario!.email).subscribe((response) => {
      this.afines = response
      this.numeroAfin = 0;
      // console.log(this.afines.length);
      this.afin = this.afines[this.numeroAfin];
      // console.log(this.afin);
      if (this.afin) {
        this.foto = './assets/' + this.afin.foto
      }

    });
  }

  like(email: string){
    this.afinidadService.like(this.usuario!.email, email).subscribe((response) => {
      this.toastr.success('Le has dado like a este usuario.', 'Like');
    });
    this.numeroAfin++
    if (this.numeroAfin < this.afines.length) {
      this.afin = this.afines[this.numeroAfin]
      this.foto = './assets/' + this.afin.foto
    } else {
      this.toastr.info('No hay más usuarios afines a ti.', 'Cuidado');
    }
  }

  dislike(email: string){
    this.afinidadService.dislike(this.usuario!.email, email).subscribe((response) => {
      this.toastr.warning('Le has dado dislike a este usuario.', 'Dislike');
    });
    this.numeroAfin++
    if (this.numeroAfin < this.afines.length) {
      this.afin = this.afines[this.numeroAfin]
      this.foto = './assets/' + this.afin.foto
    } else {
      this.toastr.info('No hay más usuarios afines a ti.', 'Cuidado');
    }
  }

}
