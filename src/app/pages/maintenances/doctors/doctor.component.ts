import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { delay } from 'rxjs/operators';

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => this.getDoctorById(id))
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    })
    this.getHospitals()

    this.doctorForm.get('hospital').valueChanges
      .pipe(delay(100))
      .subscribe((hospitalId) => this.selectedHospital = this.hospitals.find(h => h._id === hospitalId))
  }

  getDoctorById(id) {
    if ( id === 'create' ) return
    this.doctorService.getDoctorById(id)
      .subscribe(({doctor}) => {
        if (!doctor) return this.router.navigateByUrl('/dashboard/doctors')
        this.selectedDoctor = doctor
        this.doctorForm.setValue({
          hospital: doctor.hospital?._id || '',
          name: doctor.name
        })
      })
  }

  saveDoctor(){
    const { name } = this.doctorForm.value
    if (this.selectedDoctor) {
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id
      }

      this.doctorService.updateDoctor(data)
        .subscribe((res: any) => {
          Swal.fire('Updated', `${name} was updated successfully`, 'success' )
          this.router.navigateByUrl(`/dashboard/doctors/${res.doctor._id}`)
        })

    } else {
      this.doctorService.createDoctor(this.doctorForm.value)
        .subscribe((res: any) => {
          Swal.fire('Created', `${name} was created successfully`, 'success' )
          this.router.navigateByUrl(`/dashboard/doctors/${res.doctor._id}`)
        })
    }

  }

  getHospitals() {
    this.hospitalService.getHospitals()
      .subscribe(res => this.hospitals = res.hospitals)
  }

}
