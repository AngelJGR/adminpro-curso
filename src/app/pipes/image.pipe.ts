import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: 'hospitals'|'users'|'doctors'): string {
    if (img) {
      if (img.includes('https'))
        return img;
      return `${BASE_URL}/upload/${type}/${img}`;
    }
    return `${BASE_URL}/upload/users/no-image`;
  }

}
