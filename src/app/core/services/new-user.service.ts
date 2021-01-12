import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { setMasterPassword } from 'hash-password-manager/masterPassword.js';

// services
import { AuthService } from '../../auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  constructor(private router: Router, private authService: AuthService) { }

  register(password: string, username: string) {

  }


}
