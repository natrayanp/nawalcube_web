import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogsService } from '../../commonmodules/dialogs/dialogs.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { NotifyService } from '../../commonmodules/notifications/notify.service';
import { LoginapiService } from '../loginapi.service';


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
  cust_types = [
    {value: 'I', viewValue: 'Investor'},
    {value: 'D', viewValue: 'Distributor (MFD)'},
    {value: 'A', viewValue: 'Advisor (RIA)'}
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: DialogsService,
    private auth: FirebaseauthService,
    private notify: NotifyService,
    private api: LoginapiService,
  ) { }

  ngOnInit() {
    this.id1 = this.notify.get_unq_id();
    this.createSignupForm();
    this.createloginForm();
    this.signupForm.get('custtype').setValue(this.cust_types[0]);
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
            this.notify.update(this.id1, this.userpasswdlgForm.controls['email'].value +
                                ' email already registered', 'error', 'alert', 'no');
            this.mydialog.close();
            this.reset_pass_field();
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

}
