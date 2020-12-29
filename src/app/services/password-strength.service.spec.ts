import { TestBed } from '@angular/core/testing';

import { PasswordStrengthService } from './password-strength.service';

describe('PasswordStrengthService', () => {
  let service: PasswordStrengthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordStrengthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
