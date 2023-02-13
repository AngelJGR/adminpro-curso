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
  public selectedHospital: Hospital = new Hospital()

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

    this.doctorForm.get('hospital').valueChanges
      .subscribe((hospitalId) => this.selectedHospital = this.hospitals.find(h => h._id === hospitalId))
  }

  saveDoctor(){
    console.log(this.doctorForm.value)
  }

  getHospitals() {
    this.hospitalService.getHospitals()
      .subscribe(res => this.hospitals = res.hospitals)
  }

}
