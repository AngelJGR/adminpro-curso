import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LoginFormInterface } from '../interfaces/login-form.interface';
import { RegisterFormInterface } from '../interfaces/register-form.interface';
import { GetUser } from '../interfaces/user.interface';
import { User } from '../models/user.model';

declare var gapi: any;

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role
  }

  get uid(): string{
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  saveLocalStorage(res) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('menu', JSON.stringify(res.menu))
  }

  googleInit(): Promise<void> {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '310835282131-nsej5tv4h366l0u8sslk1ab7o3n45103.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  validateToken (): Observable<boolean> {
    return this.http.get(`${BASE_URL}/login/renew`, this.headers)
    .pipe(
      map((res: any) => {
        const { email, google, name, role, uid, img = '' } = res.user;
        this.user = new User(name, email, '', google, img, uid, role);
        this.saveLocalStorage(res)
        return true;
      }),
      catchError(() => of(false))
    );
  }

  createUser(formData: RegisterFormInterface) {
    return this.http.post(`${BASE_URL}/users`, formData)
      .pipe(
        tap((res: any) => this.saveLocalStorage(res))
      );
  }

  updateProfile(data: {name:string, email:string, role:string}){
    data = {
      ...data,
      role: this.user.role
    }
    return this.http.put(`${BASE_URL}/users/${this.uid}`, data, this.headers);
  }

  login(formData: LoginFormInterface) {
    return this.http.post(`${BASE_URL}/login`, formData)
      .pipe(
        tap((res: any) => this.saveLocalStorage(res))
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${BASE_URL}/login/google`, { token })
      .pipe(
        tap((res: any) => this.saveLocalStorage(res))
      );
  }

  logout () {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  getUsers (from: number = 0) {
    return this.http.get<GetUser>(`${BASE_URL}/users?from=${from}`, this.headers)
      .pipe(
        map(resp => ({
            users: resp.users.map(u => new User(u.name, u.email, '', u.google, u.img, u.uid, u.role)),
            totalUsers: resp.totalUsers
          }
        ))
      );
  }

  deleteUser(user: User) {
    return this.http.delete(`${BASE_URL}/users/${user.uid}`, this.headers)
  }

  updateUser(user: User){
    return this.http.put(`${BASE_URL}/users/${user.uid}`, user, this.headers);
  }
}

