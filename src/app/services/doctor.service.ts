import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpClient
  ) { }

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

  getDoctors (from: number = 0, limit: number = 5) {
    return this.http.get(`${BASE_URL}/doctors?from=${from}&limit=${limit}`, this.headers)
      .pipe(map((r: {ok: boolean, doctors: Doctor[]}) => ({
        doctors: r.doctors,
      })))
  }

  getDoctorById (uid: string) {
    return this.http.get(`${BASE_URL}/doctors/${uid}`, this.headers)
      .pipe(map((r: {ok: boolean, doctor: Doctor}) => ({
        doctor: r.doctor,
      })))
  }

  createDoctor(doctor: {name: string, hospital: string}) {
    return this.http.post(`${BASE_URL}/doctors`, doctor, this.headers)
  }

  updateDoctor(doctor: Doctor) {
    return this.http.put(`${BASE_URL}/doctors/${doctor._id}`, doctor, this.headers)
  }

  deleteDoctor (uid: string) {
    return this.http.delete(`${BASE_URL}/doctors/${uid}`, this.headers)
  }
}
