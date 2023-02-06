import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
        map((res: any) => res.result)
      )
  }
}
