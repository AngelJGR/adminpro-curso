import { environment } from '../../environments/environment'

const api_url = environment.base_url;

export class User {
  constructor (
    public name: string,
    public email: string,
    public password?: string,
    public google?: boolean,
    public img?: string,
    public uid? :string,
    public role?: string,
  ) {}

  get imageUrl(): string {
    if (this.img) {
      if (this.img.includes('https'))
        return this.img;
      return `${api_url}/upload/users/${this.img}`;
    }
    return `${api_url}/upload/users/no-image`;
  }
}