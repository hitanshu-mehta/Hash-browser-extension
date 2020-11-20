import { Component } from '@angular/core';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent  {

  showPassword = false;
  
  constructor() { }

  generatePassword(): void {
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}
