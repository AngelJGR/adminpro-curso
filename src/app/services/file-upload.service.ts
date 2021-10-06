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

      console.log(response.url);
      const data = await response.json();
      console.log(data);
      return 'nombre de la imagen';

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
