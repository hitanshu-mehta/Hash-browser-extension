import { flatten } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;

  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(username: string,  password: string): void {
    console.log(this.password);
    this.username = username;
    this.password = password;
  }

}
