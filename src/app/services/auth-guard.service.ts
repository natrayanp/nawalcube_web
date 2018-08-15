import { Injectable } from '@angular/core';
import { Router, CanLoad  } from '@angular/router';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad  {

  constructor(
              public router: Router,
              private auth: FirebaseauthService,
              ) { }

  canLoad(): boolean {
    if (!this.auth.firebase_user) {
      this.router.navigate(['']);
      return false;
    }
      return true;
  }

}
