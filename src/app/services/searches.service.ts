import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class SearchesService {

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

  search (type: 'hospitals'|'doctors'|'users', search: string) {
    return this.http.get<any[]>(`${BASE_URL}/search/collection/${type}/${search}`, this.headers)
      .pipe(
        map((res: any) => {
          switch (type) {
            case 'users':
              return res.result.map(u => new User(u.name, u.email, '', u.google, u.img, u.uid, u.role))
            case 'hospitals':
              return res.result
            case 'doctors':
              return res.result
            default:
              return [];
          }
        })
      )
  }

  globalSearch(text: string) {
    return this.http.get(`${BASE_URL}/search/${text}`, this.headers)
  }
}
