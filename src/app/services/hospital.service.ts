import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getHospitals (from: number = 0) {
    return this.http.get(`${BASE_URL}/hospitals?from=${from}`, this.headers)
      .pipe(map((r: {ok: boolean, hospitals: Hospital[]}) => r.hospitals))
  }
}
