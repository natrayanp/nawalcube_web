import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FirebaseauthService } from './firebaseauth.service';

@Injectable({
  providedIn: 'root'
})
export class NatinterceptorService {

  authReq: any;
  hasidtkn: boolean;
  hassess: boolean;
  haschg: boolean;

  headers: HttpHeaders = new HttpHeaders();

  constructor(private auth: FirebaseauthService) {  }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idtkn = this.auth.get_id_token();
    const sess = this.auth.get_session('nc_session');
    const entityid = sessionStorage.getItem('entityid');

    console.log(idtkn);
    console.log(sess);
    console.log(entityid);

    this.headers = this.setHeader(this.headers, 'entityid', entityid);

    if (typeof(idtkn) !== undefined) {
      this.headers = this.setHeader(this.headers, 'Authorization', 'Bearer ' + idtkn);
    }

    if (sess !== null) {
      this.headers = this.setHeader(this.headers, 'mysession', sess);
    }

    req = req.clone({headers: this.headers});

    return next.handle(req);
  }

  setHeader(headers, key , value) {
    return headers.set(key, value);
  }
}


    /*

    this.haschg = false;

    if (idtkn) {
      this.hasidtkn = true;
    } else {
      this.hasidtkn = false;
    }

    if (sess !== null) {
      this.hassess = true;
    } else {
      this.hassess = false;
    }

    /*
    if (this.hasidtkn && this.hassess ) {
        // Clone the request to add the new header.
      this.authReq = req.clone({headers: req.headers
                                        .set('Authorization', ('Bearer ' + this.auth.get_id_token()))
                                        .set('Content-Type', 'application/json')
                                        .set('Mycookie', this.auth.get_session('nc_session')),
                                });
      this.haschg = true;
      }


      if (this.hasidtkn && (!this.hassess)) {
        // Clone the request to add the new header.
      this.authReq = req.clone({headers: req.headers
                                        .set('Authorization', ('Bearer ' + this.auth.get_id_token()))
                                        .set('Content-Type', 'application/json')
                                      //  .set('Mycookie', this.auth.getCookie('nc_session')),
                                });
      this.haschg = true;
      }


      if ((!this.hasidtkn) && this.hassess ) {
        // Clone the request to add the new header.
      this.authReq = req.clone({headers: req.headers
                                      //  .set('Authorization', ('Bearer ' + this.auth.get_id_token()))
                                        .set('Content-Type', 'application/json')
                                        .set('Mycookie', this.auth.get_session('nc_session')),
                                });
        this.haschg = true;
      }

      if (this.haschg) {
        return next.handle(this.authReq);
      } else {
        return next.handle(req);
      }

   }



    



    

this.headers = this.headers.set('Authorization', ('Bearer ' + this.auth.get_id_token()));
console.log(this.headers.get('Authorization'));
this.headers = this.headers.set('Mycookie', this.auth.get_session('nc_session'));
console.log(this.headers.get('Mycookie'));

console.log(this.headers);

this.authReq  = req.clone({headers: this.headers});




}






}
*/