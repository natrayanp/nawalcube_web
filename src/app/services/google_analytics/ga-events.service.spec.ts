import { TestBed } from '@angular/core/testing';

import { GaEventsService } from './ga-events.service';

describe('GaEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GaEventsService = TestBed.get(GaEventsService);
    expect(service).toBeTruthy();
  });
});
