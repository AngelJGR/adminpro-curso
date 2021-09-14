import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginFormInterface } from '../interfaces/login-form.interface';
import { RegisterFormInterface } from '../interfaces/register-form.interface';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

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
}
