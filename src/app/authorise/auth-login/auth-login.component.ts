import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  param_missing: boolean;
  api_key: string;
  redirect_uri: string;
  request: string;
  constructor(private router: Router,
    private route: ActivatedRoute
  ) { }
  public user;
  ngOnInit() {
    this.param_missing = false;
    // http://localhost:4200/authlogin;apiKey=lklkl;redirect_uri=kdhke;request=code
    this.route.params.subscribe( params => {
      console.log(params);
      'apiKey' in params ? this.api_key = params['apikey'] : this.param_missing = true;
      'redirect_uri' in params ? this.redirect_uri = params['redirect_uri'] : this.param_missing = true;
      'request' in params ? this.request = params['request'] : this.param_missing = true;
      }
  );

  if (this.param_missing) {
    console.log('param missing');
  }
  }

  emaillogin(event) {
    console.log(event);
    switch (event.status) {
      case ('success'): {
        console.log(event.data);
        this.router.navigate(['/allow']);
        break;
      }
      case ('fail'): {
        console.log(event.data);
        break;
      }
    }
  }


}
