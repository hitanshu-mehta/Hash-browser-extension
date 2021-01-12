import { TestBed } from '@angular/core/testing';

import { GeneratePasswordService } from './generate-password.service';

describe('GeneratePasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneratePasswordService = TestBed.get(GeneratePasswordService);
    expect(service).toBeTruthy();
  });
});
