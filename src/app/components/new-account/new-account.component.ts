import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

// services
import { NewUserService } from '../../services/new-user.service';
import { LoadingSpinnerService } from './../../services/loading-spinner.service';

// models
import { ProcessStatus } from './../../model/processStatus';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent {

  createAccountForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repassword: new FormControl('', [])
  })

  hide = true;
  showPassword = false;
  bothPasswordSame = true;
  reenterTouched = false;

  constructor(
    private router: Router,
    private newAccountService: NewUserService,
    private spinner: LoadingSpinnerService,
    private location: Location
  ) { }


  // Getter functions
  get username() {
    return this.createAccountForm.get('username');
  }

  get password() {
    return this.createAccountForm.get('password');
  }

  get repassword() {
    return this.createAccountForm.get('repassword');
  }


  // Error messages
  getUsernameErrorMessages(): string {

    if (this.username.hasError('required')) {
      return 'Username is required';
    }
  }

  getPasswordErrorMessages(): string {

    if (this.password.hasError('required')) {
      return `Password is required`;
    }
    if (this.password.hasError('minlength')) {
      return `Password must be of length ${this.password.errors.minlength.requiredLength}`;
    }

  }

  getRepasswordErrorMessages(): string {

    if (this.password.touched && this.password.valid) {
      const matched = this.password.value === this.repassword.value;

      // mat-error will not be displayed untill FormControl has an error.
      // So we have to set error to repassword FormControl.
      if (matched) {
        this.repassword.setErrors(null);
      }
      else {
        this.repassword.setErrors({ notMatched: true });
      }

      return 'Passwords are not matching';
    }

  }


  onSubmit() {
    this.spinner.show('Registering new user');

    const regisObserver = {
      next: (processStatus: ProcessStatus) => {

        switch (processStatus.process) {
          case 'Registration':
            this.spinner.changeMessage('Encrypting masterpassword and registering user');
            break;
          case 'Login':
            this.spinner.changeMessage('Logining user');
            this.router.navigate(['/main']);
            this.spinner.hide();
            break;
          case 'Loading':
            break;
        }


      },
      complete: () => { }
    }


    const regis$ = this.newAccountService.Register(this.password.value, this.username.value);
    setTimeout(() => regis$.subscribe(regisObserver), 1000);
  }

  generatePassword(): void {
    // this.newAccountService.register()
  }

  back(): void {
    this.location.back();
  }

}
