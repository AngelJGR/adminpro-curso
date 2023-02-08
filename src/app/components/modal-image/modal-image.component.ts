import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

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
    public modalImageService: ModalImageService,
    private fileUploadService: FileUploadService
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

  uploadImage() {
    const type = this.modalImageService.type
    const id = this.modalImageService.uid
    console.log(this.image)
    this.fileUploadService.updateImage(this.image, type, id).then((img) => {
      Swal.fire('Save', 'The Image was uploaded successfully', 'success');
      this.modalImageService.savedImageEvent.emit(img)
      this.closeModal()
    }, error => {
      console.log(error)
      Swal.fire('Error', 'An error was ocurred when image is loading', 'error')
    });
  }

}
