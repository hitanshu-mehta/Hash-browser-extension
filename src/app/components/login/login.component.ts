import { LoadingSpinnerService } from './../../services/loading-spinner.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Import services
import { AuthService } from './../../services/auth.service';


// Import Models
import { ProcessStatus } from '../../model/processStatus'



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


  isLoading = false;

  isLoggedIn = false;
  hide = true;
  isLoginFailed = false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: LoadingSpinnerService,
    private location: Location) { }

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

    this.spinner.show('Verifying your masterpassword');

    const authObserver = {
      next: (processStatus: ProcessStatus) => {
        // console.log(processStatus);
        switch (processStatus.process) {
          case 'Verification':
            if (processStatus.complete) {
              this.spinner.hide();
              if (processStatus.status) {
                this.router.navigate(['/main']);
              }
              else {
                this.isLoginFailed = true;
              }
            }
            break;
          case 'Loading Vault':
            console.log('Loading Vault');
            break;
        }
      },
    };

    const auth$ = this.authService.Login(this.username.value, this.password.value);
    setTimeout(() => auth$.subscribe(authObserver), 1000);

  }

  back(): void {
    this.location.back();
  }


}
