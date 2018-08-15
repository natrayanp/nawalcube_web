import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable(
//  {providedIn: 'root'}
)
export class FirebaseauthService {

  /*
  this.afAuth.auth === firebase.aut()
  returns firebase.sAuth
  */

  firebase_user: firebase.User;

  constructor(
              private afAuth: AngularFireAuth,
              public router: Router
            ) {

    this.afAuth.authState.subscribe(auths => {
      console.log(auths);
      this.firebase_user = auths;
      console.log(typeof(auths));
      if (this.firebase_user) {
        console.log(this.firebase_user.uid)
        console.log('logged in');
      } else {
        this.router.navigate(['']);
        console.log('not logged in');
      }
    });
   }


  //// Email/Password Auth ////
  emailSignUp(useridpass) {
    console.log(useridpass);
    return this.afAuth.auth.createUserWithEmailAndPassword(useridpass['email'], useridpass['password']);
  }

  checkifemailexists(email) {
    return this.afAuth.auth.fetchSignInMethodsForEmail(email);
  }


  emailLogin(useridpass) {
    console.log(useridpass);
    return this.afAuth.auth.signInWithEmailAndPassword(useridpass['email'], useridpass['password']);
  }

  fire_logout() {
    console.log('before log out in service');
    console.log(this.firebase_user);
    return this.afAuth.auth.signOut();
  }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
      return this.afAuth.auth.sendPasswordResetEmail(email)
      /*  .then(() => {
          console.log('Password reset link sent to your email');
          // this.notify.update('Password reset link sent to your email', 'info', 'alert', 'no')
        })
        .catch((error) => this.handleError(error));*/
    }

    // If error, console log and notify user
    private handleError(error: Error) {
      console.log('insider service handle error');
            // this.error = error;
            console.error(error);
            console.log('insider service handle error');
            // this.notify.update(error.message, 'error');
          return('error');
    }




}
