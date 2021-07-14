import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  
  public title: string;
  public routeDataSubs$: Subscription;
  constructor(private router: Router) {
    this.routeDataSubs$ = this.getRouteData().subscribe(({title}) => {
      this.title = title;
      document.title = `AdminPro - ${title}`;
    });
  }

  ngOnDestroy(): void {
    this.routeDataSubs$.unsubscribe();
  }

  getRouteData () {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd && event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
  }

}
