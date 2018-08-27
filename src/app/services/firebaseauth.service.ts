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
  site: string;
  // isloggedin$ = new BehaviorSubject(false);
  // isinvestor = false;

  constructor(
              public afAuth: AngularFireAuth,
              public router: Router
            ) {

                this.afAuth.authState.subscribe(
                  user => {
                            this.update_auth_sate(user);
                          },
                  err =>  {
                            console.log('error in resolving auth state');
                          }
                  );
              }

   update_auth_sate(user) {
    console.log(user);
    this.firebase_user = user;
    console.log(typeof(user));
    if (this.firebase_user) {
      console.log(this.firebase_user.uid);
      console.log('logged in');
      console.log('out of id');
      // this.isloggedin$.next(true);
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
      if (this.router.url.endsWith('/signup')) {
        console.log('stay in sign up screen');
      } else {
        if(this.site === 'dv') {
          this.router.navigate(['/developers']);
        } else {
          this.router.navigate(['']);
        }
      }
      console.log('not logged in');
    }

    // this.get_id_tkn_result();

  }


  //// Email/Password Auth ////
  async emailSignUp(useridpass) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(useridpass['email'], useridpass['password']);
  /* console.log(nat);
     return nat;*/
  }


  async checkifemailexists(email) {
    return await this.afAuth.auth.fetchSignInMethodsForEmail(email);
  }


  async emailLogin(useridpass) {
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

    /*
    get_id_tkn_result() {
     console.log('firebase start');
      this.isinvestor = false;
      this.afAuth.auth.currentUser.getIdTokenResult(true)
    // }
    // async chk_user_type() {
      // await this.auth.get_id_tkn_result()
      .then((idTokenResult) => {
      console.log(idTokenResult.claims.custtype);
      if (idTokenResult.claims.custtype === 'I') {
        console.log('iam returning true');
        this.isinvestor = true;
      } else {
        // return this.navigate_to_login();
        console.log('iam returning false');
        this.isinvestor = false;
      }
    })
    .catch((error) => {
      console.log(error);
            console.log('iam returning false ctch');
           this.isinvestor = false;
         });
    }

    chk_isinvestor() {
      return this.isinvestor ? true : false;
    }
*/
    async get_id_tkn_result() {
      return await this.afAuth.auth.currentUser.getIdTokenResult(true);
    }


    public get_id_token() {
      return this.idToken;
    }

    isLoggedIn() {
      if (this.firebase_user === null ) {
          return false;
        } else {
          return true;
        }
      }

  public set_session(uid, sessid) {
    let sess_str = '';

    if (uid !== null) {
      sess_str = uid + '_sessid';
    } else {
      sess_str = '_sessid';
    }

    const sc = this.get_session(sess_str);
    console.log(sc);
    if (sc === null) {
      /*
      const currentdate = new Date();
      const val = [Array(10)].map(i => (((Math.random() * 36))).toString(36)).join('');
      const dt = currentdate.toISOString();
      const vdt = (val + dt + uid ).replace('T', ' ').replace(/-|:|\.|\s+/g, '');
      */
      /* cookie implementation
      document.cookie = cookiename + ' =' + vdt;
      */
     sessionStorage.setItem(sess_str, sessid);
    }
  }

  get_session(sess_str) {
    if (sess_str === null) {
      if (this.firebase_user.uid !== null) {
        sess_str = this.firebase_user.uid + '_sessid';
      } else {
        sess_str = '_sessid';
      }
    }

    return sessionStorage.getItem(sess_str);
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
    let sess_str = '';

    if (this.firebase_user.uid !== null) {
      sess_str = this.firebase_user.uid + '_sessid';
    } else {
      sess_str = '_sessid';
    }
    sessionStorage.removeItem(sess_str);
  }

}
