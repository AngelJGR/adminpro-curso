import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    terms: [false, [Validators.requiredTrue]]
  }, {
    validators: this.passwordMatch('password', 'confirmPassword')
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createAccount() {
    console.log(this.registerForm);
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      console.log('Formulario correcto');
      console.log(this.registerForm.value);
    } else {
      console.log('Formulario incorrecto');
    }
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
