import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable(
//  {providedIn: 'root'}
)
export class FirebaseauthService {

  constructor(private afAuth: AngularFireAuth) { }


  //// Email/Password Auth ////
  emailSignUp(useridpass) {
    console.log(useridpass);
    return this.afAuth.auth.createUserWithEmailAndPassword(useridpass['email'], useridpass['password']);
  }

  emailLogin(useridpass) {
    console.log(useridpass);
    return this.afAuth.auth.signInWithEmailAndPassword(useridpass['email'], useridpass['password']);
  }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
      return this.afAuth.auth.sendPasswordResetEmail(email)
        .then(() => {
          console.log('Password reset link sent to your email');
          // this.notify.update('Password reset link sent to your email', 'info', 'alert', 'no')
        })
        .catch((error) => this.handleError(error));
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
