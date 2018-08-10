import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogsService } from '../../commonmodules/dialogs/dialogs.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  userpasswdlgForm: FormGroup;
  param_missing: boolean;
  api_key: string;
  redirect_uri: string;
  request: string;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private dialog: DialogsService,
              private auth: FirebaseauthService
            ) { }

  ngOnInit() {
    this.createloginForm();
    this.param_missing = false;
    // http://localhost:4200/authlogin;apiKey=lklkl;redirect_uri=kdhke;request=code
    this.route.params.subscribe( params => {
      console.log(params);
      'apiKey' in params ? this.api_key = params['apikey'] : this.param_missing = true;
      'redirect_uri' in params ? this.redirect_uri = params['redirect_uri'] : this.param_missing = true;
      'request' in params ? this.request = params['request'] : this.param_missing = true;
      }
    );

    // validate api_key, redirect_uri, request by cal

    if (this.param_missing) {
      console.log('param missing');
    }
  }

  createloginForm() {
    const group = {
       'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])],
       'password' : ['', Validators.compose([Validators.required,Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)])]
    };
    this.userpasswdlgForm = this.fb.group(group);
  }

  emaillogin(event) {
    console.log(event);
    console.log('popup');
    const mydialog  = this.dialog.showalert('Title', 'We are working on your request, please wait');
    this.auth.emailLogin(this.userpasswdlgForm.value)
    .then((user) => {
      console.log(user);
      const to_upwrd = {
        'action': 'authsignin',
        'status': 'success',
        'data': user
      };
    this.router.navigate(['/allow']);
    mydialog.close();

    })
    .catch((error) => {
      const to_upwrd = {
        'action': 'authsignin',
        'status': 'fail',
        'data': error
      };
      console.log(error);
      mydialog.close();
    });
  }


}
