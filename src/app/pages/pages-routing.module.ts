import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';

import { AuthGuard } from '../guards/auth.guard';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { DoctorComponent } from './maintenances/doctors/doctor.component';
import { DoctorsComponent } from './maintenances/doctors/doctors.component';
import { HospitalsComponent } from './maintenances/hospitals/hospitals.component';
import { UsersComponent } from './maintenances/users/users.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { 
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Gráfica #1' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Theme configuration' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'search/:text', component: SearchComponent, data: { title: 'Search' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Profile User' } },

      //Maintenances
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Application hospitals' } },
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Application doctors' } },
      { path: 'doctors/:id', component: DoctorComponent, data: { title: 'Application doctors' } },

      //Admin routes
      { path: 'users', canActivate: [ AdminGuard ], component: UsersComponent, data: { title: 'Application users' } },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [ RouterModule ]
})

export class PagesRoutingModule {};