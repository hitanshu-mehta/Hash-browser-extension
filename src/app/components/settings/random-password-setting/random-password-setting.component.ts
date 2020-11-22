import { GeneratePasswordService, PasswordConfig } from './../../../services/generate-password.service';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { Component } from '@angular/core';

@Component({
  selector: 'app-random-password-setting',
  templateUrl: './random-password-setting.component.html',
  styleUrls: ['./random-password-setting.component.scss'],
})
export class RandomPasswordSettingComponent {

  settings: PasswordConfig;
  currentSelectedLength: number;

  currentSelectedLowerLength: number;
  MaxLowerLength: number;

  currentSelectedUpperLength: number;
  MaxUpperLength: number;

  currentSelectedSpecialLength: number;
  MaxSpecialLength: number;

  currentSelectedDigitLength: number;
  MaxDigitLength: number;

  isValueInvalid = false;

  generatedPassword = '';
  errorMsg = '';


  constructor(private generatePasswordService: GeneratePasswordService) {
    this.settings = generatePasswordService.getSettings();
    this.currentSelectedLength = this.settings.length;
    this.MaxLowerLength = this.MaxUpperLength = this.MaxDigitLength = this.MaxSpecialLength = this.settings.maxLength;
    this.currentSelectedLowerLength = this.settings.lowerMinLength;
    this.currentSelectedUpperLength = this.settings.upperMinLength;
    this.currentSelectedDigitLength = this.settings.digitsMinLength;
    this.currentSelectedSpecialLength = this.settings.specialMinLength;
  }

  isValidValues(): boolean {
    const val: boolean =
      (this.currentSelectedLowerLength +
        this.currentSelectedUpperLength +
        this.currentSelectedDigitLength +
        this.currentSelectedSpecialLength <= this.currentSelectedLength);
    if (!val) {
      this.errorMsg = 'Sum of minimum lengths should be less than total length!';
    }
    return val;
  }

  getPassword(): void {
    this.generatePasswordService.generatePassword(this.currentSelectedLength,
      this.currentSelectedLowerLength,
      this.currentSelectedUpperLength,
      this.currentSelectedDigitLength,
      this.currentSelectedSpecialLength).subscribe((password: string) => {
        this.generatedPassword = password;
      },
        (err) => {
          this.errorMsg = err.message;
        });
  }

}

