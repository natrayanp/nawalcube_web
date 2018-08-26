import { TestBed, inject } from '@angular/core/testing';

import { DevloginapiService } from './devloginapi.service';

describe('DevloginapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevloginapiService]
    });
  });

  it('should be created', inject([DevloginapiService], (service: DevloginapiService) => {
    expect(service).toBeTruthy();
  }));
});
