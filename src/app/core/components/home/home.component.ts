import { checkMasterPasswordPresent } from 'hash-password-manager/masterPassword.js';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  appName = 'Hass Passward Manager';
  constructor() { }

  checkIfMasterPasswordPresent(): boolean {
    return checkMasterPasswordPresent();
  }



}
