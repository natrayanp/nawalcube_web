import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogsService } from '../../commonmodules/dialogs/dialogs.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { NotifyService } from '../../commonmodules/notifications/notify.service';


@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {
  userForm: FormGroup;
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
    this.createforgotpassForm();
  }

  createforgotpassForm() {
    this.userForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])]
    });
  }

  emailpasswordreset() {
    this.notify.clearalertmsg();
    const mydialog  = this.dialog.showalert('Passowrd Reset in progress', 'We are working on your request, please wait');
    this.auth.resetPassword(this.userForm.controls['email'].value)
    .then((user) => {
                    console.log(user);
                    this.notify.update(this.id1, 'Reset email sent to ' + this.userForm.controls['email'].value, 'success', 'alert', 'no');
                    this.userForm.reset();
                    this.userForm.markAsUntouched();
                    this.userForm.markAsPristine();
                    mydialog.close();
                  })
              .catch((error) => {
                console.log(error);
                console.log('inside error');
                this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
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
