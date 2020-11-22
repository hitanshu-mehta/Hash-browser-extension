import { TestBed } from '@angular/core/testing';

import { NewUserService } from './new-user.service';

describe('NewUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewUserService = TestBed.get(NewUserService);
    expect(service).toBeTruthy();
  });
});
