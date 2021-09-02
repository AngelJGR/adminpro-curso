import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.post(`${BASE_URL}/users`, formData);
  }

  login(formData: LoginFormInterface) {
    return this.http.post(`${BASE_URL}/login`, formData);
  }
}
