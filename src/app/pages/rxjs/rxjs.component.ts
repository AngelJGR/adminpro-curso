import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {
    const obs$ = new Observable(observer => {
      let i = 0;
      const interval = setInterval(() => {
        i++
        if (i === 10) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 3) {
          console.log('Llego a 3');
          observer.error('I llegó a 3');
        }
        observer.next(i);
      }, 1000);
    });

    obs$.pipe(
      retry(2)
    ).subscribe(
      valor => console.log('Subs:', valor), 
      error => console.warn('Error', error),
      () => console.info('Finalizado'));
  }

}
