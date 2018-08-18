import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogsService } from '../../commonmodules/dialogs/dialogs.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { NotifyService } from '../../commonmodules/notifications/notify.service';

@Component({
  selector: 'app-login-land',
  templateUrl: './login-land.component.html',
  styleUrls: ['./login-land.component.scss']
})
export class LoginLandComponent implements OnInit {
  userpasswdlgForm: FormGroup;
  id1: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: DialogsService,
    private auth: FirebaseauthService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.id1 = this.notify.get_unq_id();
    this.createloginForm();
  }

  createloginForm() {
    const group = {
       'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])],
       'password' : ['', Validators.compose([Validators.required,Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)])]
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
            this.auth.set_session();
            this.router.navigate(['/secure']);
            mydialog.close();
    })
    .catch((error) => {
            console.log(error);
            this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
            mydialog.close();
    });
  }

}
