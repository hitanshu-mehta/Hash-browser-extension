import { Injectable } from '@angular/core';

import { verifyMasterPassword } from 'hash-password-manager/masterPassword.js';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false;


  Authenticate(username: string, password: string) {
    this.isLoggedIn = verifyMasterPassword(password);
    return this.isLoggedIn;
  }
}
