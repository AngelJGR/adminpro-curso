import { Component, OnInit } from '@angular/core';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public hideModal: boolean = false
  public image: File;
  public imgTemp: string | ArrayBuffer = '';

  constructor(
    public modalImageService: ModalImageService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null
    this.modalImageService.closeModal()
  }

  changeImage(file: File) {
    this.image = file;
    if (!file) {return this.imgTemp = '';}

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

}
