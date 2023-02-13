import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
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

  constructor(
    public fb: FormBuilder,
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['Nombre', Validators.required],
      hospital: ['', Validators.required]
    })
    this.getHospitals()
  }

  saveDoctor(){
    console.log(this.doctorForm.value)
  }

  getHospitals() {
    this.hospitalService.getHospitals()
      .subscribe(res => {
        console.log(res)
        this.hospitals = res.hospitals
      } )
  }

}
