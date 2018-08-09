import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { DialogsService } from '../../dialogs/dialogs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // providers: [FirebaseauthService]
})
export class LoginComponent implements OnInit {
  userpasswdlgForm: FormGroup;
  btntxt: string;
  action: any;
  @Output() loginbt: EventEmitter<any> = new EventEmitter();
  @Input() public lgtype: string;

  constructor(    private fb: FormBuilder,
                  private auth: FirebaseauthService,
                  private dialog: DialogsService
            ) { }

  ngOnInit() {
    this.createloginForm();
    this.get_btn_txt();
  }

  createloginForm() {
    const group = {
       'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])],
       'password' : ['', Validators.compose([Validators.required,Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)])]
    };
    this.userpasswdlgForm = this.fb.group(group);
  }

  emaillogin(): void {
    const mydialog  = this.dialog.showalert(this.btntxt, 'We are working on your request, please wait');
    if (this.btntxt === 'Login') {
      this.action = this.auth.emailLogin(this.userpasswdlgForm.value);
    } else if (this.btntxt === 'Signup') {
      this.action = this.auth.emailSignUp(this.userpasswdlgForm.value);
    } else if (this.btntxt === 'Reset Password') {
      this.action = this.auth.resetPassword(this.userpasswdlgForm.controls['email'].value);
    }
    this.action
    .then((user) => {
      console.log(user);
      const to_upwrd = {
        'action': this.lgtype,
        'status': 'success',
        'data': user
      };
      this.loginbt.emit(to_upwrd);
      mydialog.close();
    })
    .catch((error) => {
      const to_upwrd = {
        'action': this.lgtype,
        'status': 'fail',
        'data': error
      };
      console.log(error);
      this.loginbt.emit(to_upwrd);
      mydialog.close();
    });
  }

    /* If error, console log and notify user
    private handleError(error: Error) {
      console.log('insider service handle error');
            // this.error = error;
            console.log(error);
            console.error(error.message);
            console.log('insider service handle error');
            // this.notify.update(error.message, 'error');
          return('error');
    }
    */

   get_btn_txt() {
    console.log(this.lgtype);
    if (this.lgtype === 'loginauth' || this.lgtype === 'loginlnd') {
      this.btntxt = 'Login';
      this.userpasswdlgForm.controls['password'].setValidators(Validators.compose([Validators.required,Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)]));
      
   } else if (this.lgtype === 'signupl') {
      this.btntxt = 'Signup';
      this.userpasswdlgForm.controls['password'].setValidators(Validators.compose([Validators.required,Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)]));
   } else if (this.lgtype === 'forgot') {
    this.btntxt = 'Reset Password';
    this.userpasswdlgForm.controls['password'].setValidators(null);
    this.userpasswdlgForm.controls['password'].reset();
   }
   this.userpasswdlgForm.controls['password'].updateValueAndValidity();

   return this.btntxt;
}
}