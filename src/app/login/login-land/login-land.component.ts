import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login-land',
  templateUrl: './login-land.component.html',
  styleUrls: ['./login-land.component.scss']
})
export class LoginLandComponent implements OnInit {
  lgtype: string;

  constructor() { }

  ngOnInit() {
    this.lgtype = 'loginlnd';
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

  forgotpass() {
    console.log('forgot');
    this.lgtype = 'forgot';
  }

  login() {
    console.log('loginlnd');
    this.lgtype = 'loginlnd';
  }

}
