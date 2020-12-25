import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

// services
import { NewUserService } from '../../services/new-user.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { isString } from 'util';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';


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

  constructor(private newAccountService: NewUserService) { }


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
    this.newAccountService.register(this.password.value, this.username.value);
  }

  generatePassword(): void {
    // this.newAccountService.register()
  }


}
