import { Credentials } from './../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// services
import { LoadingSpinnerService } from '../../../core/services/loading-spinner.service';
import { PasswordStrengthService } from '../../../core/services/password-strength.service';

import { NewAccountPageActions } from '../../actions';
import * as fromAuth from '../../reducers';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent implements OnInit {
  createAccountForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repassword: new FormControl('', []),
  });

  // hide or show password
  hide = true;
  errorMessage: string | null;

  pending$ = this.store.pipe(select(fromAuth.getNewAccountPagePending));
  error$ = this.store.pipe(select(fromAuth.getNewAccountPageError));

  constructor(
    private store: Store<fromAuth.State>,
    private spinner: LoadingSpinnerService,
    private location: Location,
    private passwordStrength: PasswordStrengthService
  ) {}

  ngOnInit() {
    this.pending$.subscribe((pending) => {
      if (pending) {
        this.spinner.show('Signing in\n This may take sometime.');
        this.createAccountForm.disable();
      } else {
        this.spinner.hide();
        this.createAccountForm.enable();
      }
    });

    this.error$.subscribe((errorMsg) => {
      this.errorMessage = errorMsg;
    });
  }

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

  // returns array of strings to feed password strength meter
  getUserData(): string[] {
    return [this.username.value];
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
        this.createAccountForm.enable();
        this.repassword.setErrors(null);
        return '';
      }
      this.createAccountForm.disable();
      this.repassword.setErrors({ notMatched: true });
      return 'Passwords are not matching';
    }
  }

  getWarning(): string {
    return this.passwordStrength.getWarning(this.password.value, [this.username.value]);
  }

  getSuggestions(): string[] {
    return this.passwordStrength.getSuggestions(this.password.value, [this.username.value]);
  }

  onSubmit() {
    const credentials: Credentials = {
      username: this.username.value,
      password: this.password.value,
    };
    this.store.dispatch(NewAccountPageActions.signup({ credentials }));
  }

  generatePassword(): void {
    // this.newAccountService.register()
  }

  back(): void {
    this.location.back();
  }
}
