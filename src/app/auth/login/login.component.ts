import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted: boolean = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [ !!localStorage.getItem('email') || false ]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.renderButton();
    this.startApp();
  }

  login = () => {
    this.userService.login(this.loginForm.value)
      .subscribe(() => {
        if ( this.loginForm.get('remember').value ) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      });
    // this.router.navigateByUrl('/')
  };


  renderButton = () => {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
  }

  startApp = () => {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '310835282131-nsej5tv4h366l0u8sslk1ab7o3n45103.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin = (element) => {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.userService.loginGoogle(id_token).subscribe(() => {
            this.ngZone.run(() => this.router.navigateByUrl('/'));
          });
        }, (error) => {
          // alert(JSON.stringify(error, undefined, 2));
        });
  }

}
