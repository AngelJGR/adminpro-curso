import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  public hospitals: Hospital[] = []
  public totalHospitals: number
  public loading: boolean = true
  public from: number = 0;
  public limit: number = 5;
  public imgSubscriber: Subscription

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchesService: SearchesService

  ) { }

  ngOnInit(): void {
    this.imgSubscriber = this.modalImageService.savedImageEvent.subscribe(() => this.getHospitals())
    this.getHospitals()
  }

  getHospitals() {
    this.loading = true
    this.hospitalService.getHospitals(this.from, this.limit)
      .subscribe(hospitals => {
        this.loading = false
        this.hospitals = hospitals.hospitals
        this.totalHospitals = hospitals.totalHospitals
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

  search(value:string) {
    if (!value)
      return this.getHospitals()
    this.searchesService.search('hospitals', value)
      .subscribe((res: Hospital[]) => this.hospitals = res)
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
        .subscribe((res: {ok: boolean, hospital: Hospital}) => this.getHospitals())
    }
  }

  changePage (value: number) {
    this.from += value
    if (this.from < 0)
      this.from = 0
    else if (this.from > this.totalHospitals)
      this.from -= value
    this.getHospitals()
  }

  openImgModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital._id, hospital.img)
  }

}
