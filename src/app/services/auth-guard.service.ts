import { Injectable } from '@angular/core';
import { CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router, CanActivate } from '@angular/router';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { DialogsService } from '../commonmodules/dialogs/dialogs.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad, CanActivate {
  isinvestor = false;
  constructor(
              public router: Router,
              private auth: FirebaseauthService,
              private dialog: DialogsService,
              ) { }

  canLoad(route: Route): Promise<boolean> {
    console.log('inside auth');
    return this.commonvalidations();
  }

  canActivate(): Promise<boolean> {
    console.log('inside auth');
    return this.commonvalidations();
  }


commonvalidations(): Promise<boolean> {
const mydialog  = this.dialog.showalert('Login Validatoins', 'Few more steps to do before we authenticate you');
return new Promise((resolve) => {
  console.log('start');
  if (this.auth.isLoggedIn()) {
        // Check if user is investor
        console.log('inside if');
        this.auth.get_id_tkn_result1()
        .then((idTokenResult) => {
          // Confirm the user is an Investor.
          console.log('inside if then');
          console.log(idTokenResult.claims.custtype);
          if (idTokenResult.claims.custtype === 'I') {
              resolve(true);
              mydialog.close();
          } else {
            this.navigate_to_login();
              resolve(false);
              mydialog.close();
          }
       })
       .catch((error) => {
        this.navigate_to_login();
        resolve(false);
        mydialog.close();
       });
  } else {
    this.navigate_to_login();
    // https://alligator.io/angular/query-parameters/
    resolve(false);
    mydialog.close();
  }
}
}

private navigate_to_login() {
  console.log('inside fale hanlder');
  this.router.navigate(['/login'], { queryParams: { reason: 'guardfail'}, queryParamsHandling: 'merge'});
}



}

/*


canLoad(): boolean {
    if (this.auth.isLoggedIn()) {
      // Check if user is investor
      this.auth.get_id_tkn_result()
      .then((idTokenResult) => {
          // Confirm the user is an Investor.
          console.log(idTokenResult.claims.custtype);
          if (idTokenResult.claims.custtype === 'I') {
            console.log('iam returning true');
              return true;
          } else {
            // return this.navigate_to_login();
            return true;
          }
       })
     .catch((error) => {
       console.log(error);
            // return this.navigate_to_login();
            return true;     
          });
    } else {
            // return this.navigate_to_login();
            return true;    }
  }

  private navigate_to_login() {
    console.log('inside fale hanlder');
    this.router.navigate(['/login'], { queryParams: { reason: 'guardfail'}, queryParamsHandling: 'merge'});
    return false;
  }

}

*/