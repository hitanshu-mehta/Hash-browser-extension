import { Credentials } from '../../../model/credentials';
import { LoadingSpinnerService } from '../../../core/services/loading-spinner.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginPageActions } from '../../actions';
import * as fromAuth from '../../reducers';

import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));
  // hide or show password
  hide = true;
  errorMessage: string | null;

  constructor(
    private store: Store<fromAuth.State>,
    private spinner: LoadingSpinnerService,
    private location: Location) { }

  ngOnInit(){
    this.pending$.subscribe( pending => {
      if(pending){
        this.spinner.show();
        this.loginForm.disable();
      }else{
        this.spinner.hide();
        this.loginForm.enable();
      }
    });

    this.error$.subscribe( errorMsg => { this.errorMessage = errorMsg; } );
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
    const credentials: Credentials =  {
      username : this.username.value,
      password: this.password.value
    };
    this.store.dispatch(LoginPageActions.login({credentials}));
  }


  back(): void {
    this.location.back();
  }

}
