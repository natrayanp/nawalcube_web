import { Component, OnChanges, OnInit, DoCheck, AfterContentInit, AfterViewInit, AfterViewChecked,  AfterContentChecked, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogsService } from '../../commonmodules/dialogs/dialogs.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { NotifyService } from '../../commonmodules/notifications/notify.service';
import {ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnChanges, OnInit, DoCheck, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, OnDestroy {
  userpasswdlgForm: FormGroup;
  api_param_missing = false;
  uri_param_missing = false;
  req_param_missing = false;
  id1: string;
  id2: string;
  api_key = '';
  redirect_uri = '';
  req_param = '';
  comlogo_txt3val: string;
  fatal_err = false;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private dialog: DialogsService,
              private auth: FirebaseauthService,
              private notify: NotifyService,
              private cdref: ChangeDetectorRef
            ) { 
            }

  ngOnInit() {
    console.log('ngOnInit master');
    this.id1 = this.notify.get_unq_id();
    this.id2 = this.notify.get_unq_id();
    this.createloginForm();
    // http://localhost:4200/authlogin;apiKey=lklkl;redirect_uri=kdhke;request=code
    /*
    this.route.params.subscribe( params => {
      console.log(params);
      'apiKey' in params ? this.api_key = params['apikey'] : this.param_missing = true;
      'redirect_uri' in params ? this.redirect_uri = params['redirect_uri'] : this.param_missing = true;
      'request' in params ? this.request = params['request'] : this.param_missing = true;
      }
          );

      */

     this.route
     .queryParams
     .subscribe(params => {
     'apiKey' in params ? this.api_key = params['apikey'] : this.api_param_missing = true;
     'redirect_uri' in params ? this.redirect_uri = params['redirect_uri'] : this.uri_param_missing = true;
     'request' in params ? this.req_param = params['request'] : this.req_param_missing = true;
       console.log(params);
     });


    // validate api_key, redirect_uri, request by cal
    console.log(this.req_param);

  }

  ngOnChanges() {
    console.log('ngOnChanges master');
  }

 

  ngDoCheck() {
    console.log('ngDoCheck master');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit master');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked master');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked master');
    this.Check_for_param_err();
    this.cdref.detectChanges();
  }

  ngOnDestroy() {
    
  }


  ngAfterViewInit(): void {
    console.log('ngAfterViewInit master');
    }

  Check_for_param_err() {

    if (this.req_param_missing) {
      this.send_error_resp(this.req_param);
    } else {
      if (this.req_param === 'code') {
        this.comlogo_txt3val = 'applications name';
      } else if (this.req_param === 'yenn') {
        this.comlogo_txt3val = 'API';
      } else {
        this.send_error_resp(this.req_param);
      }
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
    this.notify.clearalertmsg();
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
      console.log(this.req_param);
    if (this.req_param === 'code') {
    this.router.navigate(['/allow']);
    } else if (this.req_param === 'yenn') {
      console.log('inside yenn ');
      this.router.navigate(['/devsecure']);
    }
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
      this.send_error_resp(this.req_param);
    });
  }

  send_error_resp(req_param) {
    if (req_param === 'yenn') {
      this.router.navigate(['/devlgerr']);
    } else if (req_param === 'code') {
      this.router.navigate([this.redirect_uri], { queryParams: { code: 'error' } });
    } else {
      if (this.redirect_uri.length > 0) {
        this.router.navigate([this.redirect_uri], { queryParams: { code: 'error' } });
      } else {
        this.fatal_err = true;
        this.userpasswdlgForm.controls['password'].reset();
        console.log(this.id2);
        this.notify.update(this.id2, 'Looks like fatal error.  Please retry from the URL from which you are trying to login', 'error', 'alert', 'no');
        // this.userpasswdlgForm.controls['password'].reset();
      }
    }
  }



}
