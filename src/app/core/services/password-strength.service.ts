import { Injectable } from '@angular/core';

import * as zxcvbn from 'zxcvbn';

@Injectable({
  providedIn: 'root',
})
export class PasswordStrengthService {
  private passwordStrengthObj: any;
  private passward: '';
  private userDate: string[];

  constructor() {}

  update(password: string, userData?: string[]): void {
    if (password === this.passward && this.userDate === userData) {
      return;
    }
    this.passwordStrengthObj = zxcvbn(password, userData);
  }

  getStrength(password: string, userData?: string[]): number {
    this.update(password, userData);
    return this.passwordStrengthObj.score;
  }

  getSuggestions(password: string, userData?: string[]): string[] {
    this.update(password, userData);
    return this.passwordStrengthObj.feedback.suggestions;
  }

  getWarning(password: string, userData?: string[]): string {
    this.update(password, userData);
    return this.passwordStrengthObj.feedback.warning;
  }
}
