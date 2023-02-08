import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true
  public type: 'users'|'doctors'|'hospitals'
  public uid: string
  public img: string
  public savedImageEvent: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  get hideModal () {
    return this._hideModal
  }

  openModal(type: 'users'|'doctors'|'hospitals', uid: string, img:string = 'no-img') {
    this._hideModal = false
    this.type = type
    this.uid = uid
    if (img.includes('https'))
      this.img = img
    else
      this.img = `${BASE_URL}/upload/${type}/${img}`
    
  }

  closeModal(){
    this._hideModal = true
  }

}
