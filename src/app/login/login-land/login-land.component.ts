import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DialogsService } from '../../commonmodules/dialogs/dialogs.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { LoginService } from '../../services/login.service';
import { NotifyService } from '../../commonmodules/notifications/notify.service';
import {  filter } from 'rxjs/operators';
// import { LoginapiService } from '../loginapi.service';


@Component({
  selector: 'app-login-land',
  templateUrl: './login-land.component.html',
  styleUrls: ['./login-land.component.scss']
})
export class LoginLandComponent implements OnInit, AfterViewChecked {
  userpasswdlgForm: FormGroup;
  id1: string;
  shoalrt = false;
  myr: any;
  mydialog: any;

  constructor(
    // private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    // private dialog: DialogsService,
    private auth: FirebaseauthService,
    private notify: NotifyService,
    // private api: LoginapiService,
    private loginserv: LoginService
  ) { }

  ngOnInit() {
    this.id1 = this.notify.get_unq_id();
    // Make the loged in user details as empty before login: START
        this.auth.firebase_user = null;
        this.auth.idToken = '';
    // Make the loged in user details as empty before login: END
    this.createloginForm();
    this.myr = this.route.queryParams
    .pipe(filter(params => params.reason))
      .subscribe(params => {
       (params.reason === 'guardfail') ? this.shoalrt = true : console.log('kk');
        console.log(params); // {reason: 'guardfail'} from authgurad
      });
  }

  ngAfterViewChecked() {
    if (this.shoalrt) {
      this.notify.update(this.id1, 'You are not authorised ', 'error', 'alert', 'no');
      this.shoalrt = false;
    }

}

  createloginForm() {
    const group = {
       'email': ['', Validators.compose([Validators.required, 
        Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])],

       'password' : ['', Validators.compose([Validators.required,
                      Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)])]
    };
    this.userpasswdlgForm = this.fb.group(group);
  }

  emaillogin() {
    this.loginserv.emaillogin(this.userpasswdlgForm, this.id1, 'nclogin');
  }
/*
  emaillogin1() {
    this.notify.clearalertmsg();
    this.mydialog  = this.dialog.showalert('Title', 'We are working on your request, please wait');
    console.log(this.userpasswdlgForm.value);
    this.auth.emailLogin(this.userpasswdlgForm.value)
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
            this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
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
      this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
      this.mydialog.close();
    });
    console.log('inside f1 end');


    if (this.auth.idToken !== null) {
      this.loginuserapi(user);
    }
  }


  loginuserapi(user) {
    console.log('inside f2 end');

 //   const mydialog  = this.dialog.showalert('Title', 'Registering your login with server, please wait');
  this.api.loginapiget('nclogin')
  .subscribe (
      (resp: any) => {
        // try to get last login, user status, user name
        console.log(resp);
        console.log('navigate to secure page');

       if (user.user.uid === resp.uid) {
            this.auth.set_session(user.user.uid, resp.sessionid);
            this.mydialog.close();
            this.router.navigate(['/secure']);
        } else {
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
        this.api.loginapiget('ncloginks')
        .subscribe (
            (resp: any) => {
              // try to get last login, user status, user name
              console.log(resp);
              console.log('navigate to secure page');
              if (user.user.uid === resp.uid) {
                this.auth.set_session(user.user.uid, resp.sessionid);
                this.mydialog.close();
                this.router.navigate(['/secure']);
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
*/
}
