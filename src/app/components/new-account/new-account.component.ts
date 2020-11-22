import { Component } from '@angular/core';

// services
import { NewUserService } from '../../services/new-user.service';


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent {

  showPassword = false;
  bothPasswordSame = true;
  reenterTouched = false;
  username = '';

  constructor(private newAccountService: NewUserService) { }

  generatePassword(): void {
    // this.newAccountService.register()
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  verifyBothPasswords(password1: string, password2: string, isReenter: boolean): boolean {
    this.reenterTouched = this.reenterTouched || isReenter;
    this.bothPasswordSame = this.reenterTouched ? (password1 === password2) : true;
    return (password1 === password2);
  }

  register(password1: string, password2: string, isReenter: boolean): void {
    if (!this.verifyBothPasswords(password1, password2, isReenter)) {
      return;
    }
    this.newAccountService.register(password1, this.username);

  }


}
