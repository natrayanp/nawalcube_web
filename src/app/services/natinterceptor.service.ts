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
  
  protected headers: HttpHeaders = new HttpHeaders();

  constructor(private auth: FirebaseauthService) {  }
  
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idtkn = this.auth.get_id_token();
    const sess = this.auth.getsession('nc_session');
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

    if (this.hasidtkn && this.hassess ) {
        // Clone the request to add the new header.
      this.authReq = req.clone({headers: req.headers
                                        .set('Authorization', ('Bearer ' + this.auth.get_id_token()))
                                        .set('Content-Type', 'application/json')
                                        .set('Mycookie', this.auth.getsession('nc_session')),
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
                                        .set('Mycookie', this.auth.getsession('nc_session')),
                                });
        this.haschg = true;
      }

      if (this.haschg) {
        return next.handle(this.authReq);
      } else {
        return next.handle(req);
      }

   }



}
