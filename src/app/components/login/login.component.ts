import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { flatten } from '@angular/compiler';
import { Component } from '@angular/core';
import { verifyMasterPassword } from 'hash-password-manager/masterPassword.js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;


  isLoggedIn = false;
  showPassword = false;
  isLoginFailed = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(username: string, password: string): void {
    this.username = username;
    this.password = password;
    this.isLoggedIn = this.authService.Authenticate(this.username, this.password);

    if (this.isLoggedIn) {
      this.router.navigate(['/main']);
      return;
    }
    this.isLoginFailed = true;

  }

}
