import { Component, OnInit } from '@angular/core';
import { NatHttpService } from '../../services/http.service';
import { GenserviceService } from '../../services/genservice.service';

@Component({
  selector: 'app-auth-allow',
  templateUrl: './auth-allow.component.html',
  styleUrls: ['./auth-allow.component.scss']
})
export class AuthAllowComponent implements OnInit {

  constructor( private http: NatHttpService,
               private genserv: GenserviceService,
            ) { }

  ngOnInit() {
  }

accept() {
  // Generate user auth token
  // end point - userauth
  console.log(this.genserv.auth_accept_data);
  this.http.apipost('userauth', this.genserv.auth_accept_data )
  .subscribe(
      (ress: any) => {
        console.log(ress);
        console.log(this.genserv.auth_accept_data.redirecturi + '?authtkn=' + ress.body.authtkn);
        window.location.href = this.genserv.auth_accept_data.redirecturi + '?authtkn=' + ress.body.authtkn;
      },
      (errs) => {
        console.log(errs);
      }
  );
}

deny() {

}

}
