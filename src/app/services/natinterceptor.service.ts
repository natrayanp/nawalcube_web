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
  isaddtkn: boolean;
  idtkn: string;
  sess = null;
  skip: boolean;

  headers: HttpHeaders = new HttpHeaders();

  constructor(private auth: FirebaseauthService) {  }
  
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.skip = false;
    console.log(req.url);
    if (req.url.endsWith('appname')) {
      this.isaddtkn = true;
    } 
    
    if (req.url.endsWith('toups')) {
      this.skip = true;
    }

  if (!this.skip) {

    if (!this.isaddtkn) {
      console.log('token id start');
      this.idtkn = this.auth.get_id_token();
      console.log('token id end');
      this.sess = this.auth.get_session(null);
      console.log(this.idtkn);
    }
    console.log(this.idtkn);
    console.log((this.idtkn) !== undefined);
    const entityid = sessionStorage.getItem('entityid');
    const countryid = sessionStorage.getItem('countryid');
    console.log(entityid);

    this.headers = this.setHeader(this.headers, 'entityid', entityid);
    this.headers = this.setHeader(this.headers, 'countryid', countryid);

    if ((this.idtkn) !== undefined) {
      this.headers = this.setHeader(this.headers, 'Authorization', 'Bearer ' + this.idtkn);
    }

    if (this.sess !== null) {
      this.headers = this.setHeader(this.headers, 'mysession', this.sess);
    }

    req = req.clone({headers: this.headers});
    return next.handle(req);
  } else {
    return next.handle(req);
  }



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
*/