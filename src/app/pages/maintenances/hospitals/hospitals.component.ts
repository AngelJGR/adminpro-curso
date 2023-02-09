import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

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

}
