import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervalSubscription: Subscription;
  constructor() {
    
    // this.returnObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('Subs:', valor), 
    //   error => console.warn('Error', error),
    //   () => console.info('Finalizado'));

    this.intervalSubscription = this.returnInterval().subscribe( console.log )

    // this.returnInterval().subscribe(
    //   valor => console.log(valor)
    // )
  }
  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  returnInterval(): Observable<number>{
    return interval(300)
      .pipe( 
        map(val => val+1),
        filter(num => num % 2 === 0),
        // take(10),
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
