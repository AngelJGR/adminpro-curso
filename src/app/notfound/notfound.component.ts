import { Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: [ './notfound.component.css' ]
})
export class NotfoundComponent {

  public year: number = new Date().getFullYear();

  constructor() { }

}
