import { GeneratePasswordService, PasswordConfig } from './../../../services/generate-password.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

// services
import { ClipboardService } from './../../../services/clipboard.service';

@Component({
  selector: 'app-random-password-setting',
  templateUrl: './random-password-setting.component.html',
  styleUrls: ['./random-password-setting.component.scss'],
})
export class RandomPasswordSettingComponent {

  hide = true;

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


  constructor(private generatePasswordService: GeneratePasswordService, private location: Location, private clipboard: ClipboardService) {
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

  back(): void {
    this.location.back();
  }

  copyToClipboard(): void{
    this.clipboard.copy(this.generatedPassword);
    this.clipboard.clearClipBoard();
  }

}

