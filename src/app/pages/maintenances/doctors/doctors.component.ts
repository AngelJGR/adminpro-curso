import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

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
  ) { }

  ngOnInit(): void {
    this.getDoctors()
  }

  getDoctors() {
    this.loading = true
    this.doctorService.getDoctors()
      .subscribe(res => {
        this.doctors = res.doctors
        this.loading = false;
      })
  }

}
