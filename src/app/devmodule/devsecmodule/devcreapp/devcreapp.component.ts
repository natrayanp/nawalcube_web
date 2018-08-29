import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../../../services/firebaseauth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-devcreapp',
  templateUrl: './devcreapp.component.html',
  styleUrls: ['./devcreapp.component.scss']
})
export class DevcreappComponent implements OnInit {
  name: string;
  custtyp: string;
  selectedapp = '';
  appform: FormGroup;
  ishowapp: boolean;
  constructor(
              private auth: FirebaseauthService,
              private fb: FormBuilder
            ) { }

  ngOnInit() {
    this.name = 'natrayan app';
    this.checkfor_selected_app();
    this.createappForm();
    switch (this.auth.tknclaims.custtype) {
        case ('I'): {
          this.custtyp = 'Investor';
          this.set_validators();
          break;
        }
        case ('D'): {
          this.custtyp = 'Distributor (MFD)';
          break;
        }
        case ('A'): {
          this.custtyp = 'Advisor (RIA)';
          break;
        }
        case ('T'): {
          this.custtyp = 'Portfolio Tools';
          this.set_validators();
          break;
        }
      }
      this.appform.get('appusertype').setValue(this.custtyp);
  }


  createappForm() {

    this.appform = this.fb.group({
      'appname': ['', Validators.compose([Validators.required])],
      'appusertype': [this.custtyp],
      'redirecturi': ['', Validators.compose([Validators.required])],
      'postbackuri': [''],
      'description': [''],
      'starmfdet': ['', Validators.compose([Validators.required])]
    });
  }


  set_validators() {
  this.appform.get('starmfdet').clearValidators();
  this.appform.get('starmfdet').updateValueAndValidity();
}

  copy_clip_brd(inputElement) {
      inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0);
  }
/*
         this.signupForm.get('adhaar')
            .setValidators(Validators.compose([Validators.required, Validators.maxLength(12), Validators.pattern(/[0-9]{12}/)]));
          this.signupForm.get('adhaar').updateValueAndValidity();


                    this.signupForm.get('adhaar').clearValidators();
          this.signupForm.get('adhaar').updateValueAndValidity();

*/
  rbchange(ev) {
    this.auth.selectedapp = ev;
    console.log(ev);
    this.checkfor_selected_app();
    console.log(this.custtyp);
  }

  checkfor_selected_app() {
  if (this.auth.selectedapp === '') {
    this.ishowapp = false;
  } else {
    this.selectedapp = this.auth.selectedapp;
    this.ishowapp = true;
  }
  this.auth.selectedapp = '';
  }

}
