import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  public hospitals: Hospital[] = []
  public loading: boolean = true

  constructor(
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    this.getHospitals()
  }

  getHospitals() {
    this.loading = true
    this.hospitalService.getHospitals()
      .subscribe(hospitals => {
        console.log(hospitals)
        this.loading = false
        this.hospitals = hospitals
      })
  }

}
