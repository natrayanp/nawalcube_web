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
  mydialog: any;
  id1: string;

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
  }

  createSignupForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(70), Validators.pattern(/[A-Za-z]{3,70}/)])],
      adhaar: ['', Validators.compose([Validators.required, Validators.maxLength(12), Validators.pattern(/[0-9]{12}/)])],
      pan : ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/[a-zA-Z0-9]{10}/)])],
      mobile : ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/[0-9]{10}/)])]
    });
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
                                            ])]
    };
    this.userpasswdlgForm = this.fb.group(group);
    const tt = this.userpasswdlgForm.valueChanges;
    tt.subscribe (
      (res) => {
        if ((this.userpasswdlgForm.controls['repassword'].value).toString().length > 0) {
          if (this.userpasswdlgForm.controls['repassword'].value !== this.userpasswdlgForm.controls['password'].value) {
            this.userpasswdlgForm.controls['repassword'].setErrors({nomatch: true});
            // this.userpasswdlgForm.controls['repassword'].updateValueAndValidity();
          } else {
            this.userpasswdlgForm.controls['repassword'].setErrors({nomatch: null});
            this.userpasswdlgForm.controls['repassword'].updateValueAndValidity();
          }
        }
      }
    );
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

            
            // this.signup();
            // console.log('after ');
            // this.createuser2();
        }

      })
      .catch((error) => {
        this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
        this.mydialog.close();
      });
  }

  async signup() {
    
    console.log('inside f1 start');
    // const x = await this.createuser();
    // const x = await this.auth.emailSignUp(this.userpasswdlgForm.value);
  /*
    await this.auth.emailSignUp(this.userpasswdlgForm.value)
    .then((user) => {
      console.log('iam inside success' + user);
      endf = false;
    })
    .catch((error) => {
      this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
      this.mydialog.close();
      endf = true;
    });
*/
    console.log('inside f1 end');

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

    console.log('inside f2 end');
    if (this.auth.idToken !== null) {
      this.createuserapi();
    }
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
            const msgtouser = error['message'];
            this.auth.fire_del_usr()
            .then((userq) => {
              console.log(userq);
              this.commontask(msgtouser);
            })
            .catch((errorr) => {
              console.log(errorr);
              this.commontask(msgtouser);
            })
          }
      );
}


commontask(msg) {
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
    this.userpasswdlgForm.markAsUntouched();
    this.signupForm.markAsUntouched();
    this.userpasswdlgForm.markAsPristine();
    this.signupForm.markAsPristine();
  }

}
