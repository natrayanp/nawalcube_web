import { TestBed, inject } from '@angular/core/testing';

import { LoginapiService } from './loginapi.service';

describe('LoginapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginapiService]
    });
  });

  it('should be created', inject([LoginapiService], (service: LoginapiService) => {
    expect(service).toBeTruthy();
  }));
});
