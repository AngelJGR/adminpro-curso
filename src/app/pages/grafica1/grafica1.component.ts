import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  public labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  public data1 = [[180, 324, 78]];
  public data2 = [[321, 109, 226]];
  public data3 = [[234, 297, 100]];
  public data4 = [[94, 228, 350]];

  constructor() { }

  ngOnInit(): void {
  }

}
