import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted: boolean = false;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    terms: [false, [Validators.requiredTrue]]
  }, {
    validators: this.passwordMatch('password', 'confirmPassword')
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createAccount() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.createUser(this.registerForm.value)
      .subscribe(() => {
        this.router.navigateByUrl('/');
      }, (err) => Swal.fire('Error', err.error.msg, 'error'));
  }

  validateField( field: string ) {
    return this.registerForm.get(field).invalid && this.formSubmitted;
  }

  passwordMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const pass1control = formGroup.get(password);
      const pass2control = formGroup.get(confirmPassword);

      (pass1control.value === pass2control.value && !(pass1control.value === '' && pass2control.value === '')) ? pass2control.setErrors(null) : pass2control.setErrors({ notMatch: true });
    }
  }

}
