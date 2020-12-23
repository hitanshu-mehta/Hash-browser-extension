import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { flatten } from '@angular/compiler';

import { AuthService } from './../../services/auth.service';
import { verifyMasterPassword } from 'hash-password-manager/masterPassword.js';

import { InstanstErrorStateMatcher } from './../../utils/instant-error-state.matcher';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  errorStateMatcher = new InstanstErrorStateMatcher();

  isLoggedIn = false;
  hide = true;
  isLoginFailed = false;

  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  // Getter functions
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }


  // Error Messages
  getUsernameErrorMessage(): string {

    if (this.username.hasError('required')) {
      return 'Username is required';
    }
  }

  getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'Password is required';
    }
    if (this.password.hasError('minlength')) {
      return 'Minimum length of password should be ' + this.password.errors.minlength.requiredLength;
    }
  }

  onSubmit(): void {
    this.isLoggedIn = this.authService.Authenticate(this.username.value, this.password.value);

    if (this.isLoggedIn) {
      this.router.navigate(['/main']);
      return;
    }
    this.isLoginFailed = true;

  }

}
