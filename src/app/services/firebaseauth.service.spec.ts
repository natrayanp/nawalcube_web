import { TestBed, inject } from '@angular/core/testing';

import { FirebaseauthService } from './firebaseauth.service';

describe('FirebaseauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseauthService]
    });
  });

  it('should be created', inject([FirebaseauthService], (service: FirebaseauthService) => {
    expect(service).toBeTruthy();
  }));
});
