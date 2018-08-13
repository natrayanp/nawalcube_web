import { Injectable } from '@angular/core';
import { Router, CanLoad  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad  {

  constructor(public router: Router) { }

  canLoad(): boolean {
    // if (!this.auth.isAuthenticated()) {
       // this.router.navigate(['']);
       return false;
  //    }
     // return true;
  }

}
