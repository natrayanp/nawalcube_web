import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogsService } from '../../commonmodules/dialogs/dialogs.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';

@Component({
  selector: 'app-login-land',
  templateUrl: './login-land.component.html',
  styleUrls: ['./login-land.component.scss']
})
export class LoginLandComponent implements OnInit {
  userpasswdlgForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: DialogsService,
    private auth: FirebaseauthService
  ) { }

  ngOnInit() {
    this.createloginForm();
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
