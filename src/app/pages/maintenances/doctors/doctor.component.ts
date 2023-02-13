import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup
  public hospitals: Hospital[] = []
  public selectedHospital: Hospital = new Hospital()
  public selectedDoctor: Doctor

  constructor(
    public fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    })
    this.getHospitals()

    this.doctorForm.get('hospital').valueChanges
      .subscribe((hospitalId) => this.selectedHospital = this.hospitals.find(h => h._id === hospitalId))
  }

  saveDoctor(){
    const { name } = this.doctorForm.value
    this.doctorService.createDoctor(this.doctorForm.value)
      .subscribe((res: any) => {
        Swal.fire('Created', `${name} was created successfully`, 'success' )
        this.router.navigateByUrl(`/dashboard/doctors/${res.doctor._id}`)
      })
  }

  getHospitals() {
    this.hospitalService.getHospitals()
      .subscribe(res => this.hospitals = res.hospitals)
  }

}
