import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogsService } from '../../commonmodules/dialogs/dialogs.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { NotifyService } from '../../commonmodules/notifications/notify.service';
import { LoginapiService } from '../loginapi.service';
import { cust_types } from '../../shared/interfacess';
import { NatHttpService } from '../../services/http.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  signupForm: FormGroup;
  userpasswdlgForm: FormGroup;
  mydialog:  any;
  id1: string;
  selectedValue: string;
  cust_types = [];
  hmlnk: string;
  loglnk: string;
  otherapp: boolean;
  cust_readonly: boolean;
  appname: string;
  appid: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: DialogsService,
    private auth: FirebaseauthService,
    private notify: NotifyService,
    private api: LoginapiService,
    private route: ActivatedRoute,
    private http: NatHttpService
  ) { }

  ngOnInit() {
    this.auth.fire_logout();
    this.cust_readonly = false;
    this.cust_types = cust_types;
    this.id1 = this.notify.get_unq_id();
    this.createSignupForm();
    this.createloginForm();
    this.signupForm.get('custtype').setValue(this.cust_types[0]);
    this.set_links();
    // const param1 = allParams.param1 // retrieve the parameter "param1"
    // https://nawalcube.com/login/signup
  }


  set_links() {
    const allParams = this.route.snapshot.queryParams; // allParams is an object
    console.log(this.route.snapshot);
    console.log(allParams.type);
    console.log(typeof(allParams.type) !== 'undefined');
    if (typeof(allParams.type) !== 'undefined') {
      this.cust_types = [];
      this.cust_types.push(cust_types[0]);
      this.signupForm.get('custtype').setValue(this.cust_types[0]); // investor
      this.cust_readonly = true; // investor
      if (allParams.type === 'signup') {
        this.otherapp = true;
        this.appid = allParams.appid;
        this.hmlnk = allParams.home;
        this.loglnk = allParams.home;
        this.appname = allParams.appname;

        console.log(this.appid);
        console.log(this.hmlnk);
        console.log(this.loglnk);
        console.log(this.appname);


      } else {
        this.otherapp = false;
      }
     
      /*
      // validations of appid before navigate
      const datas = {'appid': allParams.appid,'login':'nologin'};
      this.http.apipost('appnlfetch', datas)
      .subscribe(
                (res: any) => {
                  console.log(res);
                  if (res.body.result_data === null){
                    window.location.href = this.hmlnk;
                    // respond back with error from server
                    // this.respond_error();
                  } else {
                    this.appname = res.result_data.appname;
                  }                  
                },
                (erro) => {
                  // Any error or appid not valid
                  console.log(erro);
                  // window.location.href = this.hmlnk;
                }
      );
    // validations of appid before navigate
    */
    
    } else {
      this.cust_types = cust_types;
    }
  }


  respond_error() {
    const datas = {
      'appid': this.appid,
      'respond': 'error'
    }
    this.http.apipost('appregresp', datas)
    .subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  myt(pg) {
    if (this.otherapp) {
      window.location.href = this.hmlnk;
    } else {
      if (pg === 'ln') {
        this.router.navigate(['/login']);
      } else if (pg === 'hm') {
        this.router.navigate(['/']);
      }
    }
  }

  createSignupForm() {
    this.signupForm = this.fb.group({
      custtype: [0, Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required, Validators.maxLength(70), Validators.pattern(/[A-Za-z]{3,70}/)])],
      adhaar: ['', Validators.compose([Validators.required, Validators.maxLength(12), Validators.pattern(/[0-9]{12}/)])],
      pan : ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/[a-zA-Z0-9]{10}/)])],
      arn:  [''],
      mobile : ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/[0-9]{10}/)])]
    });

    const tt1 = this.signupForm.get('custtype').valueChanges;
    tt1.subscribe (
      (res) => {
        console.log(res);
        if (res !== null) {
        console.log(this.signupForm.get('arn'));
        console.log(res.value);
        if (res.value === 'I') {
          this.signupForm.get('adhaar')
            .setValidators(Validators.compose([Validators.required, Validators.maxLength(12), Validators.pattern(/[0-9]{12}/)]));
          this.signupForm.get('adhaar').updateValueAndValidity();
          this.signupForm.get('pan')
            .setValidators(Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/[a-zA-Z0-9]{10}/)]));
          this.signupForm.get('pan').updateValueAndValidity();
          console.log(this.signupForm.get('arn'));
        } else {
          console.log('inside non 0 validator');
          this.signupForm.get('adhaar').clearValidators();
          this.signupForm.get('adhaar').updateValueAndValidity();
          this.signupForm.get('pan').clearValidators();
          this.signupForm.get('pan').updateValueAndValidity();
        }
      }
    }
    );
  }

  createloginForm() {
    const group = {
       'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])],
       'password' : ['', Validators.compose([Validators.required,
                                              Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)
                                            ])
                                          ],
       'repassword' : ['', Validators.compose([Validators.required,
                                              Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)
                                            ])
                                          ]
    };
    this.userpasswdlgForm = this.fb.group(group);
   /*
   This is giving max stack error
    const tt = this.userpasswdlgForm.get('password').valueChanges;
    const tt2 = this.userpasswdlgForm.get('repassword').valueChanges;
    tt.subscribe (
      (res) => {
                    this.passwordcompare();
                }
    );
    tt2.subscribe (
      (res) => {
                    this.passwordcompare();
                }
    );
    */
  }


  passwordcompare() {
    const pass = this.userpasswdlgForm.controls['password'].value.toString();
    const confpass = this.userpasswdlgForm.controls['repassword'].value.toString();
    let match = false;

    if (pass.length > 0 && confpass.length > 0) {
        if (pass !== confpass) {
          match = false;
        } else if (pass === confpass) {
          match = true;
        }
        const haserr = this.userpasswdlgForm.controls['repassword'].getError('passmatch');

        if (match && haserr) {
          this.userpasswdlgForm.controls['repassword'].setErrors({passmatch: null});
          this.userpasswdlgForm.controls['repassword'].updateValueAndValidity();
        }

        if ((!match) && (!haserr)) {
          this.userpasswdlgForm.controls['repassword'].setErrors({passmatch: true});
          this.userpasswdlgForm.controls['repassword'].updateValueAndValidity();
        }

        return match;
    }

    }

    submitsignup() {
      const ismatch  = this.passwordcompare();
      console.log(ismatch);
      if (ismatch) {
        this.emailsignup();
      } else {
        this.userpasswdlgForm.controls['repassword'].setErrors({passmatch: true});
      }
    }


  emailsignup() {
    this.notify.clearalertmsg();
    this.mydialog  = this.dialog.showalert('Sign Up in progress', 'We are working on your request, please wait');
      this.auth.checkifemailexists(this.userpasswdlgForm.controls['email'].value)
      .then((user) => {
        console.log(user);
        if (user.length > 0) {
          if(this.otherapp) {
            this.resp_to_other_app('exists', this.userpasswdlgForm.controls['email'].value);
          } else {
            this.notify.update(this.id1, this.userpasswdlgForm.controls['email'].value +
                                ' email already registered', 'error', 'alert', 'no');
            this.mydialog.close();
            this.reset_pass_field();
          }
        } else {
            this.esignup();
        }
      })
      .catch((error) => {
        this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
        this.mydialog.close();
      });
  }


  esignup() {
    console.log('before ');
    this.auth.emailSignUp(this.userpasswdlgForm.value)
      .then((userx) => {
        console.log('iam inside success' + userx);
        this.signup();
      })
      .catch((error) => {
        this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
        this.mydialog.close();
      });
  }

  async signup() {
    console.log('inside f1 start');
    await this.auth.refresh_id_token()
    .then(idToken => {
      this.auth.idToken = idToken;
      console.log('inside get id token');
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
      this.createuserapi();
    }
    console.log('inside f2 end');
  }

  createuserapi() {
      this.api.loginapipost('signup', this.signupForm.value)
      .subscribe (
          resp => {
                if(this.otherapp) {
                  this.resp_to_other_app('new', this.userpasswdlgForm.controls['email'].value);
                } else {
                this.auth.fire_logout()
                .then((userq) => {
                  console.log(userq);
                  this.mydialog.close();
                  this.notify.update(
                            this.id1,
                              'Sign up with user id ' +
                              this.userpasswdlgForm.controls['email'].value +
                              ' completed.  Login now.', 'success', 'alert', 'no'
                          );
                  this.reset_all_form();
                  })
                .catch((error) => {
                  console.log(error);
                  this.mydialog.close();
                  this.notify.update(
                            this.id1,
                              'Sign up with user id ' +
                              this.userpasswdlgForm.controls['email'].value +
                              ' has issues.  Please contact support.', 'error', 'alert', 'no'
                          );
                  this.reset_all_form();
                  });
                }
          },  
          error => {
            console.log(error);
            const msgtouser = error.error['error_msg'];
            console.log(error.error);
            console.log(error.error['error_msg']);
            this.auth.fire_del_usr()
            .then((userq) => {
              console.log(userq);
              this.commontask(msgtouser);
            })
            .catch((errorr) => {
              console.log(errorr);
              this.commontask(msgtouser);
            });
          }
      );
  }


commontask(msg) {
  console.log('closing dialog');
  console.log(this.mydialog);
  this.mydialog.close();
  this.notify.update(
            this.id1,
              'Sign up with user id ' +
              this.userpasswdlgForm.controls['email'].value +
              ' has issues.  Please contact support. [server: ' + msg + ']', 'error', 'alert', 'no'
          );
  this.reset_all_form();
}

  send_data_to_api(scrndfunc, data) {
    this.api.loginapipost(scrndfunc, data)
    .subscribe (
      resp => {
        this.mydialog.close();
        this.notify.update(
                  this.id1,
                    'Sign up with user id ' +
                    this.userpasswdlgForm.controls['email'].value +
                    ' completed.  Login now.', 'success', 'alert', 'no'
                );
        this.reset_all_form();
        this.auth.fire_logout();
      },
      error => {
        console.log(error);
        this.auth.fire_del_usr();
      }
    );
  }


  reset_pass_field() {
    this.userpasswdlgForm.controls['password'].reset();
    this.userpasswdlgForm.controls['repassword'].reset();
    this.userpasswdlgForm.markAsUntouched();
    this.userpasswdlgForm.markAsPristine();
  }

  reset_all_form () {
    this.userpasswdlgForm.reset();
    this.signupForm.reset();
    this.signupForm.get('custtype').setValue(this.cust_types[0]);
    this.userpasswdlgForm.markAsUntouched();
    this.signupForm.markAsUntouched();
    this.userpasswdlgForm.markAsPristine();
    this.signupForm.markAsPristine();
  }

  resp_to_other_app(signup, email) {
    const dats = {
      'signup': signup,
      'email': email,
      'appid': this.appid
    }
    this.api.loginapipost('appregres',dats)
    .subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }

}
