import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogsService } from '../../commonmodules/dialogs/dialogs.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { NotifyService } from '../../commonmodules/notifications/notify.service';
import {  filter } from 'rxjs/operators';


@Component({
  selector: 'app-login-land',
  templateUrl: './login-land.component.html',
  styleUrls: ['./login-land.component.scss']
})
export class LoginLandComponent implements OnInit, AfterViewChecked {
  userpasswdlgForm: FormGroup;
  id1: string;
  shoalrt = false;
  myr:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: DialogsService,
    private auth: FirebaseauthService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.id1 = this.notify.get_unq_id();
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
    console.log('popup');
    const mydialog  = this.dialog.showalert('Title', 'We are working on your request, please wait');
    console.log(this.userpasswdlgForm.value);
    this.auth.emailLogin(this.userpasswdlgForm.value)
    .then((user) => {
            console.log(user);
            // setting session for the user.  On logout remove this.
            this.auth.set_session();
            mydialog.close();
            console.log('navigate to secure page');
            this.router.navigate(['/secure']);
    })
    .catch((error) => {
            console.log(error);
            this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
            mydialog.close();
    });
  }

}
