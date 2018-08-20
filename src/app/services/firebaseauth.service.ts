import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable(
//  {providedIn: 'root'}
)
export class FirebaseauthService {

  /*
  this.afAuth.auth === firebase.aut()
  returns firebase.sAuth
  */

  firebase_user: firebase.User;
  idToken: string;
  session_id: string;
  isloggedin$ = new BehaviorSubject(false);


  constructor(
              public afAuth: AngularFireAuth,
              public router: Router
            ) {

    this.afAuth.authState.subscribe(user => {
      this.update_auth_sate(user);
    });
   }

   update_auth_sate(user) {
    console.log(user);
    this.firebase_user = user;
    console.log(typeof(user));
    if (this.firebase_user) {
      console.log(this.firebase_user.uid);
      console.log('logged in');
      console.log('out of id');
      this.isloggedin$.next(true);
      // this.get_id_token();
      this.refresh_id_token()
      .then(idToken => {
        this.idToken = idToken;
      }).catch(function(error) {
        // Handle error
        console.log('error inside get id token');
        this.idToken = null;
      });
    } else {
      console.log(this.router.url);
      if(this.router.url.endsWith('/signup')) {
        console.log('stay in sign up screen');
      } else {
        this.router.navigate(['']);
      }
      console.log('not logged in');
    }
  }


  //// Email/Password Auth ////
  async emailSignUp(useridpass) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(useridpass['email'], useridpass['password']);
  }


  async checkifemailexists(email) {
    return await this.afAuth.auth.fetchSignInMethodsForEmail(email);
  }


  async emailLogin(useridpass) {
    console.log(useridpass);
    return await this.afAuth.auth.signInWithEmailAndPassword(useridpass['email'], useridpass['password']);
  }

  async fire_logout() {
    console.log('before log out in service');
    console.log(this.firebase_user);
    return await this.afAuth.auth.signOut();
  }

  // Sends email allowing user to reset password
  async resetPassword(email: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(email)
    /*  .then(() => {
        console.log('Password reset link sent to your email');
        // this.notify.update('Password reset link sent to your email', 'info', 'alert', 'no')
      })
      .catch((error) => this.handleError(error));*/
  }

  async fire_del_usr() {
    return await this.afAuth.auth.currentUser.delete();
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

    async refresh_id_token() {
      return await this.afAuth.auth.currentUser.getIdToken(/* forceRefresh */ false);
    }


    public get_id_token() {
      return this.idToken;
    }


  public set_session() {
    const sc = this.get_session('nc_session');
    console.log(sc);
    if (sc === null) {
      const currentdate = new Date();
      const val = [Array(10)].map(i => (((Math.random() * 36))).toString(36)).join('');
      const dt = currentdate.toISOString();
      const vdt = (val + dt ).replace('T', ' ').replace(/-|:|\.|\s+/g, '');
      /* cookie implementation
      document.cookie = cookiename + ' =' + vdt;
      */
     sessionStorage.setItem('nc_session', vdt);
    }
  }

  get_session(name) {
    return sessionStorage.getItem(name);
  /*
  cookie implementation
  // Get name followed by anything except a semicolon
  const cookiestring = RegExp('' + cookiename + '[^;]+').exec(document.cookie);
    console.log(cookiestring);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : '');
  */
  }

  delete_session() {
    sessionStorage.removeItem('nc_session');
  }

}
