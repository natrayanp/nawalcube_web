import { TestBed, inject } from '@angular/core/testing';

import { DevmodService } from './devmod.service';

describe('DevmodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevmodService]
    });
  });

  it('should be created', inject([DevmodService], (service: DevmodService) => {
    expect(service).toBeTruthy();
  }));
});
