import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {
  public logo: string;
  constructor(
  ) {
    this.logo="./assets/logo.png";
  }

  ngOnInit(): void {
  }

}
