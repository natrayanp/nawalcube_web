import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createSignupForm();
  }

  createSignupForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(70), Validators.pattern(/[A-Za-z]{3,70}/)])],
      adhaar: ['', Validators.compose([Validators.required, Validators.maxLength(12), Validators.pattern(/[0-9]{12}/)])],
      pan : ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/[a-zA-Z0-9]{10}/)])],
      mobile : ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/[0-9]{10}/)])]
    });
  }

  emaillogin(event) {
    console.log(event);
    switch (event.status) {
      case ('success'): {
        console.log(event.data);
        break;
      }
      case ('fail'): {
        console.log(event.data);
        break;
      }
    }
  }


}
