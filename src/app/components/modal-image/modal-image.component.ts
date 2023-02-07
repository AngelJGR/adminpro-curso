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

  constructor(
    public modalImageService: ModalImageService
  ) { }

  ngOnInit(): void {
  }

}
