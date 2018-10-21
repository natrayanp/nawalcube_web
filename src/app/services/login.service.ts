import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifyService } from '../commonmodules/notifications/notify.service';
import { DialogsService } from '../commonmodules/dialogs/dialogs.service';
import { FirebaseauthService } from './firebaseauth.service';
import { NatHttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  mydialog: any;
  id1: string;
  scrndfunc: string;
  constructor(
     private router: Router,
  //  private route: ActivatedRoute,
    private dialog: DialogsService,
    private auth: FirebaseauthService,
    private notify: NotifyService,
    private api: NatHttpService,
    
  ) { }

  emaillogin(usrpassfrmval, id1, scrndfunc) {
    this.id1 = id1;
    this.scrndfunc = scrndfunc;
    this.notify.clearalertmsg();
    console.log('login service');
    this.mydialog  = this.dialog.showalert('Info', 'We are working on your request, please wait');
    console.log(usrpassfrmval.value);
    this.auth.emailLogin(usrpassfrmval.value)
    .then((user) => {
            this.auth.firebase_user = user.user;
            console.log(user);
            console.log(user.user.phoneNumber);
            console.log(user.user.uid);
            console.log(user.user.providerId);
            console.log(user.user.displayName);
            console.log(user.user.email);
            // setting session for the user.  On logout remove this.
            // this.auth.set_session(user.user.uid);
            // const data_to_api = {'sessionid': this.auth.get_session(user.user.uid)};
            this.signup(user);
    })
    .catch((error) => {
            console.log(error);
            const mydialog1  = this.dialog.okalert('Error', error.message);
            mydialog1.subscribe(res => {
              if (res) {
                  console.log(res);
              }
            }
            );
            this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
            console.log('after');
            this.mydialog.close();
    });
  }



  async signup(user) {
   // const mydialog  = this.dialog.showalert('Title', 'Collecting auth results, please wait');
    console.log('inside f1 start');
    await this.auth.refresh_id_token()
    .then(idToken => {
      this.auth.idToken = idToken;
      console.log('inside get id token');
   //   mydialog.close();
    })
    .catch(function(error) {
      // Handle error
      console.log('error inside get id token');
      this.auth.idToken = null;
      const mydialog1  = this.dialog.okalert('Error', error.message);
      mydialog1.subscribe(res => {
        if (res) {
            console.log(res);
        }
      }
      );
      this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
      this.mydialog.close();
    });
    console.log('inside f1 end');

    await this.auth.get_id_tkn_result()
    .then((idTokenResult) => {  
      // Confirm the user is an Investor.
      console.log('inside if then after f1');
      console.log(idTokenResult.claims.custtype);
      this.auth.tknclaims = idTokenResult.claims;
      console.log(this.auth.tknclaims);
      })
    .catch((error) => {
      console.log(error);
      });
    console.log('after f1 end end');
    if (this.auth.idToken !== null) {
      this.loginuserapi(user);
    }
  }


  loginuserapi(user) {
    console.log('inside f2 end');

 //   const mydialog  = this.dialog.showalert('Title', 'Registering your login with server, please wait');
  this.api.apiget(this.scrndfunc)
  .subscribe (
      (resp: any) => {
        // try to get last login, user status, user name
        console.log(resp);
        console.log('navigate to secure page');
        console.log(user);

       if (user.user.uid === resp.uid) {
            this.auth.set_session(user.user.uid, resp.sessionid);
            this.mydialog.close();
            const navlocation = this.get_nav_location('success');
            this.router.navigate([navlocation]);
        } else {
          const mydialog1  = this.dialog.okalert('Error', 'Please clear your browser cache and retry');
          mydialog1.subscribe(res => {if (res) {console.log(res); }});
          this.notify.update(this.id1, 'Please clear your browser cache and retry', 'error', 'alert', 'no');
          this.mydialog.close();
        }
      },
      (err) => {
        console.log(err);
        if (err.error.status_code === 401) {
          this.mydialog.close();
          this.reconfirm_sess(user, err.error.usrmsg);
        }
        console.log(err);
        const mydialog1  = this.dialog.okalert('Error', 'Unknown error, plese try again');
        mydialog1.subscribe(res => {if (res) {console.log(res); }});
        this.notify.update(this.id1, 'Unknown error, plese try again' , 'error', 'alert', 'no');
        this.mydialog.close();
      }
    );
  }


  reconfirm_sess(user, urmsg) {
    const mydialog = this.dialog.deletealert('Proceed Login?', urmsg);
    mydialog.subscribe(res => {
      this.mydialog  = this.dialog.showalert('Title', 'We are working on your request, please wait');
      if (res) {
        this.api.apiget(this.scrndfunc + 'ks')
        .subscribe (
            (resp: any) => {
              // try to get last login, user status, user name
              console.log(resp);
              console.log('navigate to secure page');
              if (user.user.uid === resp.uid) {
                this.auth.set_session(user.user.uid, resp.sessionid);
                this.mydialog.close();
                const navlocation = this.get_nav_location('success');
                this.router.navigate([navlocation]);
              } else {
                this.notify.update(this.id1, 'Please clear your browser cache and retry', 'error', 'alert', 'no');
                this.mydialog.close();
              }
            },
            err => {
              this.notify.update(this.id1, err.error.usrmsg, 'error', 'alert', 'no');
              this.mydialog.close();
            }
          );


      } else {
        this.notify.update(this.id1, 'You have cancelled login', 'error', 'alert', 'no');
        this.mydialog.close();
      }
    });
  }

  get_nav_location(act) {
    switch (act) {
      case ('success'): {
        if (this.scrndfunc === 'nclogin') {
          return '/secure';
        } else if (this.scrndfunc === 'dvlogin') {
          return 'developers/devsecure';
        }
        break;
      }
    }

  }

}
