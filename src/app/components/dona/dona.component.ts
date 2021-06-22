import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() title: string = 'Sin título';
  @Input() labels: string[];
  @Input() data: MultiDataSet;
  
  public doughnutChartType: ChartType = 'doughnut';

  public colors: Colors[] = [
    {backgroundColor: ['#6857E6', '#009FEE', '#F02059']}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
