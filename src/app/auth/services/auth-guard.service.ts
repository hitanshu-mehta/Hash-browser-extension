import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    return true;
    // if (this.authService.isLoggedIn) { return true; }

    this.router.navigate(['/home']);
  }
}
