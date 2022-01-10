// This code is taken from
// https://github.com/mikeybyker/angular2-zxcvbn/blob/master/src/app/strong-password/strength-meter/strength-meter.component.ts



import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';

import { PasswordStrengthService } from '../../core/services/password-strength.service';

@Component({
  selector: 'app-strength-meter',
  templateUrl: './strength-meter.component.html',
  styleUrls: ['./strength-meter.component.scss']
})
export class StrengthMeterComponent implements  OnChanges {

  @Input() password = '';
  @Input() userData: string[] = [];

  @Output() passwordStrength = new EventEmitter();

  strength = 0;

  constructor(private passwordStrengthService: PasswordStrengthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const passwordChange = changes.password;
    const userDataChange = changes.userData;

    this.getStrength(passwordChange ? passwordChange.currentValue : this.password, userDataChange ? userDataChange.currentValue : []);
  }

  getStrength(password: string, userDate?: string[]) {
    const estimation = this.passwordStrengthService.getStrength(password,userDate);
    this.strength = estimation;
    this.passwordStrength.emit({
      strength: this.strength
    });
  }

  getClass() {
    return `level-${this.strength}`;
  }

}
