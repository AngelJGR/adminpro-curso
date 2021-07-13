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
    
    this.returnObservable().pipe(
      retry(1)
    ).subscribe(
      valor => console.log('Subs:', valor), 
      error => console.warn('Error', error),
      () => console.info('Finalizado'));
  }

  returnObservable(): Observable<number> {
    let i = 0;
    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++
        if (i === 10) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 3) {
          console.log('es 3');
          observer.error('I llegó a 3');
        }
        if (i === 7) {
          console.log('es 7');
          observer.error('I llegó a 7');
        }
        observer.next(i);
      }, 1000);
    });

  }

}
