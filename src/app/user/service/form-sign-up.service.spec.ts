import { TestBed } from '@angular/core/testing';

import { FormSignUpService } from './form-sign-up.service';

describe('FormSignUpService', () => {
  let service: FormSignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
