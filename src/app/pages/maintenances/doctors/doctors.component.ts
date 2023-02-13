import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {

  public doctors: Doctor[] = []
  public totalHospitals: number
  public loading: boolean = true

  constructor(
    private doctorService: DoctorService,
    private modalImageService: ModalImageService,
    private searchesService: SearchesService
  ) { }

  ngOnInit(): void {
    this.getDoctors()
  }

  search(value:string) {
    if (!value)
      return this.getDoctors()
    this.searchesService.search('doctors', value)
      .subscribe((res: Doctor[]) => this.doctors = res)
  }

  getDoctors() {
    this.loading = true
    this.doctorService.getDoctors()
      .subscribe(res => {
        this.doctors = res.doctors
        this.loading = false;
      })
  }

  openImgModal(doctor: Doctor) {
    this.modalImageService.openModal('doctors', doctor._id, doctor.img)
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Are you sure want to delete?',
      text: `You almost delete to ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed)
        this.doctorService.deleteDoctor(doctor._id)
          .subscribe(() => {
            Swal.fire(
              'Deleted!',
              `${doctor.name} has been deleted.`,
              'success'
            )
            this.getDoctors()
          })
    })
  }

}
