import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginFormInterface } from '../interfaces/login-form.interface';
import { RegisterFormInterface } from '../interfaces/register-form.interface';

declare var gapi: any;

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '310835282131-nsej5tv4h366l0u8sslk1ab7o3n45103.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
    });
  }

  validateToken (): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${BASE_URL}/login/renew`, {
      headers: {
        'x-token': token
      }
    })
    .pipe(
      tap((res: any) => localStorage.setItem('token', res.token)),
      map(() => true),
      catchError(() => of(false))
    );
  }

  createUser(formData: RegisterFormInterface) {
    return this.http.post(`${BASE_URL}/users`, formData)
      .pipe(
        tap((res: any) => localStorage.setItem('token', res.token))
      );
  }

  login(formData: LoginFormInterface) {
    return this.http.post(`${BASE_URL}/login`, formData)
      .pipe(
        tap((res: any) => localStorage.setItem('token', res.token))
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${BASE_URL}/login/google`, { token })
      .pipe(
        tap((res: any) => localStorage.setItem('token', res.token))
      );
  }

  logout () {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
