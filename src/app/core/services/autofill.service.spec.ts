import { TestBed } from '@angular/core/testing';

import { AutofillService } from './autofill.service';

describe('AutofillService', () => {
  let service: AutofillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutofillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
