import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  public hospitals: Hospital[] = []
  public loading: boolean = true
  public imgSubscriber: Subscription

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService
  ) { }

  ngOnInit(): void {
    this.imgSubscriber = this.modalImageService.savedImageEvent.subscribe(() => this.getHospitals())
    this.getHospitals()
  }

  getHospitals() {
    this.loading = true
    this.hospitalService.getHospitals()
      .subscribe(hospitals => {
        this.loading = false
        this.hospitals = hospitals
      })
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital.name, hospital._id)
      .subscribe(() => Swal.fire('Updated', hospital.name, 'success'))
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id)
      .subscribe(() => {
        this.getHospitals()
        Swal.fire('deleted', hospital.name, 'success')
      })
  }

  async openCreateModal() {
    const { value } = await Swal.fire<string>({
      input: 'text',
      title: 'Create hospital',
      text: 'Enter the new hospital name',
      inputPlaceholder: 'Hospital name',
      showCancelButton: true,
    })

    if (value) {
      this.hospitalService.createHospital(value)
        .subscribe((res: {ok: boolean, hospital: Hospital}) =>  {
          this.hospitals.push(res.hospital)
      })
    }
  }

  openImgModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital._id, hospital.img)
  }

}
