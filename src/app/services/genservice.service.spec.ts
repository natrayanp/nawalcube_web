import { TestBed } from '@angular/core/testing';

import { GenserviceService } from './genservice.service';

describe('GenserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenserviceService = TestBed.get(GenserviceService);
    expect(service).toBeTruthy();
  });
});
