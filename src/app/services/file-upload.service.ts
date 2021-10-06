import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updateImage(
    file: File,
    type: 'users'|'doctors'|'hospitals',
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await response.json();
      
      return data.ok ? data.filename : false;

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
