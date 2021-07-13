import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {
    
    // this.returnObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('Subs:', valor), 
    //   error => console.warn('Error', error),
    //   () => console.info('Finalizado'));

    this.returnInterval().subscribe( console.log )

    // this.returnInterval().subscribe(
    //   valor => console.log(valor)
    // )
  }

  returnInterval(): Observable<number>{
    return interval(1000)
      .pipe( 
        take(4),
        map(val => val+1)
      );
    
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
