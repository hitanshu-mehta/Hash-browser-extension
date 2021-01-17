import { Injectable } from '@angular/core';

import { passwordGenerator } from 'hash-password-manager/randomGenerator';
import { Observable, of } from 'rxjs';

export interface PasswordConfig {
  length: number;
  minLength: number;
  maxLength: number;

  defaultMinLowerLength: number;
  defaultMinUpperLength: number;
  defaultMinDigitLength: number;
  defaultMinSpecialLength: number;

  lowerMinLength: number;
  upperMinLength: number;
  specialMinLength: number;
  digitsMinLength: number;
}


@Injectable({
  providedIn: 'root'
})
export class GeneratePasswordService {
  private passwordConfig: PasswordConfig = {
    length: 10,
    minLength: 8,
    maxLength: 15,
    defaultMinLowerLength: 0,
    defaultMinUpperLength: 0,
    defaultMinDigitLength: 0,
    defaultMinSpecialLength: 0,
    lowerMinLength: 1,
    upperMinLength: 1,
    specialMinLength: 1,
    digitsMinLength: 1,
  };

  constructor() { }

  getSettings(): PasswordConfig {
    return this.passwordConfig;
  }

  generatePassword(
    length: number,
    currentSelectedLowerLength: number,
    currentSelectedUpperLength: number,
    currentSelectedDigitLength: number,
    currentSelectedSpecialLength: number
  ): Observable<string> {

    return new Observable((observer) => {
      try {
        const pwd =
          passwordGenerator.generatePassword(
            length,
            currentSelectedLowerLength,
            currentSelectedUpperLength,
            currentSelectedDigitLength,
            currentSelectedSpecialLength);
        observer.next(pwd as string);
      } catch (err) {
        observer.error(err);
      }
    });


  }


}
