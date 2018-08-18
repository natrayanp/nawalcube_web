import { TestBed, inject } from '@angular/core/testing';

import { NatinterceptorService } from './natinterceptor.service';

describe('NatinterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NatinterceptorService]
    });
  });

  it('should be created', inject([NatinterceptorService], (service: NatinterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
