import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent {

  progress: number = 10;

  constructor() { }

  get getProgress () {
    return `${this.progress}%`;
  }

  changeValueProgress(val: number) {
    if (this.progress >= 100 && val >= 0) {
      return this.progress = 100;
    }
    if (this.progress <= 0 && val < 0) {
      return this.progress = 0;
    }
    return this.progress = this.progress + val;
  }

}
