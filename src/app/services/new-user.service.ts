import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { setMasterPassword } from 'hash-password-manager/masterPassword.js';


@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  constructor(private router: Router, private authService: AuthService) { }

  register(password: string, username: string): void {
    setMasterPassword(password);
    this.authService.isLoggedIn = true;
    this.router.navigate(['/main']);
  }


}
