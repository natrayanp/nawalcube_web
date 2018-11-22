import { Component, OnChanges, OnInit, DoCheck, AfterContentInit, AfterViewInit, AfterViewChecked,  AfterContentChecked, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogsService } from '../../commonmodules/dialogs/dialogs.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { NotifyService } from '../../commonmodules/notifications/notify.service';
import {ChangeDetectorRef } from '@angular/core';
import { NatHttpService } from '../../services/http.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenserviceService } from '../../services/genservice.service';


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
  app_id = '';
  redirect_uri = '';
  req_param = '';
  comlogo_txt3val: Observable<any>;
  fatal_err = false;
  mydialog: any;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private dialog: DialogsService,
              private auth: FirebaseauthService,
              private notify: NotifyService,
              private cdref: ChangeDetectorRef,
              private http: NatHttpService,
              private httpc: HttpClient,
              private genserv: GenserviceService,
            ) { 
            }

  ngOnInit() {
    console.log('ngOnInit master');
    this.id1 = this.notify.get_unq_id();
    this.id2 = this.notify.get_unq_id();
    // Make the loged in user details as empty before login: START
        this.genserv.auth_accept_data = {};
        this.auth.firebase_user = null;
        this.auth.idToken = '';
    // Make the loged in user details as empty before login: END
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
     'appid' in params ? this.app_id = params['appid'] : this.api_param_missing = true;
     'redirecturi' in params ? this.redirect_uri = params['redirecturi'] : this.uri_param_missing = true;
     'type' in params ? this.req_param = params['type'] : this.req_param_missing = true;
     
       console.log(params);
       this.initialise_scrn();
       
     });


    // validate api_key, redirect_uri, request by cal
    console.log(this.req_param);

  }


  initialise_scrn() {
    //Validate if the request is for valid app id
    const ttt = {'appid': this.app_id, 'redirecturi': this.redirect_uri};
    console.log(ttt);
    // this.comlogo_txt3val = this.http.apipost('authappnm', ttt).pipe(map(res => res.body.result_data.appname));
    this.http.apipost('authappnm', ttt)
    .subscribe((resp: any) => {
                          console.log(resp);
                          const subject = new Subject();
                          this.comlogo_txt3val = subject.pipe(map(res => res));
                          subject.next(resp.body.result_data.appname);
                          //this.comlogo_txt3val = res.body.result_data.appname;
                          console.log(this.comlogo_txt3val);
                        },
                (err) => {
                  console.log(err);
                  this.send_error_resp(this.req_param);
                  // respond with error
                }
  );
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
        // this.comlogo_txt3val = 'applications name';
      } else if (this.req_param === 'yenn') {
        const subject = new Subject();
        this.comlogo_txt3val.source = subject.pipe(map(res => res));
        subject.next('API');
        console.log('inside Check_for_param_err else else if');
      } else {
        this.send_error_resp(this.req_param);
      }
    }
  }


  createloginForm() {
    const group = {
       'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])],
       'password' : ['',
                      Validators.compose([Validators.required,
                                          Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)
                                        ])
                    ]
    };
    this.userpasswdlgForm = this.fb.group(group);
  }

  emaillogin(event) {
    this.notify.clearalertmsg();
    console.log(event);
    console.log('popup');
    this.mydialog  = this.dialog.showalert('Title', 'We are working on your request, please wait');
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
        // console.log(user.user.uid);
        console.log(user.user.uid);

        this.genserv.auth_accept_data = {
          'userid' : user.user.uid,
          'appid': this.app_id,
          'redirecturi': this.redirect_uri
        };

        this.mydialog.close();
        this.router.navigate(['/authorise/allow']);
        // window.location.href = 'http://127.0.0.1:8080/testapp?code=1345455';
    } else if (this.req_param === 'yenn') {
      this.mydialog.close();
        console.log('inside yenn ');
        this.router.navigate(['/developers/devsecure']);
        // this.router.navigate([{ outlets: { devout: '/developers/devsecure/devdash'}}]);
    }

    })
    .catch((error) => {
      const to_upwrd = {
        'action': 'authsignin',
        'status': 'fail',
        'data': error
      };
      console.log(error);
      this.mydialog.close();
      this.send_error_resp(this.req_param);
    });
  }

  send_error_resp(req_param) {
    console.log('inside send req');
    console.log(req_param);
    console.log(this.redirect_uri);
    if (req_param === 'yenn') {
      this.router.navigate(['developers/devlgerr']);
    } else if (req_param === 'code') {
      
      // this.router.navigate([this.redirect_uri], { queryParams: { code: 'error' } });
            window.location.href = this.redirect_uri + '?type=code&regdata=401&msg=error in navigation';
      // this.httpc.post (this.redirect_uri, {'r': this.redirect_uri});
    } else {
      if (this.redirect_uri.length > 0) {
        //this.router.navigate([this.redirect_uri], { queryParams: { code: 'error' } });
              window.location.href = this.redirect_uri + '?type=code&regdata=401&msg=request type not know';
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
