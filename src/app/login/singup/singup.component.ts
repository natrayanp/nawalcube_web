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
       'password' : ['', Validators.compose([Validators.required,Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)])],
       'repassword' : ['', Validators.compose([Validators.required,Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)])]
    };
    this.userpasswdlgForm = this.fb.group(group);
    let tt = this.userpasswdlgForm.valueChanges;
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
          this.notify.update(this.id1, this.userpasswdlgForm.controls['email'].value + ' email already registered', 'error', 'alert', 'no');
          this.mydialog.close();
          this.reset_pass_field();
        } else {
          //this.createuser();
        }

      })
      .catch((error) => {
        this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
        this.mydialog.close();
      });
      /*
      if (!already_regis) {

    }
    */
  }

  subzzz() {
    this.mydialog  = this.dialog.showalert('Sign Up in progress', 'We are working on your request, please wait');
    this.createuser({'email': 'natrayanp@gmail.com', 'password': 'test@321' });
  }

  createuser(data) {
    this.auth.emailSignUp(data)
    // this.auth.emailSignUp(this.userpasswdlgForm.value)
    .then((user) => {
      console.log(user);
      // Send data to API
      this.send_data_to_api('signup', this.signupForm.value);

      this.mydialog.close();
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      this.notify.update(
                this.id1,
                  'Sign up with user id ' +
                  this.userpasswdlgForm.controls['email'].value +
                  ' completed.  Login now.', 'success', 'alert', 'no'
              );
      this.reset_all_form();
    })
    .catch((error) => {
      this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
      console.log(error);
      this.mydialog.close();
      this.userpasswdlgForm.controls['password'].reset();
    });
  }

  send_data_to_api(scrndfunc, data) {
    this.api.loginapipost(scrndfunc, data)
    .subscribe (
      resp => {
        console.log(resp);
      },
      error => {
        console.log(error);
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
