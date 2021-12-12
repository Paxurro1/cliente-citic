import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulariologing',
  templateUrl: './formulariologing.component.html',
  styleUrls: ['./formulariologing.component.scss']
})
export class FormulariologingComponent implements OnInit {
  public logo: string;
  constructor() {
    this.logo="./assets/logo.png";
  }

  ngOnInit(): void {
  }

}
