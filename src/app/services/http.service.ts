import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FirebaseauthService } from './firebaseauth.service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NatHttpService {

  protected headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient,
              private auth: FirebaseauthService
             ) { }

  // POST request to API
  apipost(scrndfunc, data, conttyp = 'json') {
    console.log(environment['url_' + scrndfunc] + '/' + environment['endpt_' + scrndfunc]);
    return this.http.post(
                          environment['url_' + scrndfunc] + '/' + environment['endpt_' + scrndfunc],
                          data,
                          {observe: 'response'}
                          // {headers: this.set_http_headers(conttyp), observe: 'response', withCredentials: true}
                        );
  }

  // GET request to API
  apiget(scrndfunc, conttyp = 'json') {
    return this.http.get(
                          environment[scrndfunc + 'url'] + '/' + environment[scrndfunc]
                         // {headers: this.set_http_headers(conttyp), observe: 'response'}
                        );
  }



  set_http_headers(conttyp) {

    if (conttyp === 'json') {
      this.setHeader(this.headers, 'Content-Type', 'application/json');
    }

    this.headers.append('custom-header', 'mycookie');
    

    // Get the id token and set it in the header for api
    const idtkn = this.auth.get_id_token();

    if (idtkn !== null) {
      this.setHeader(this.headers, 'Authorization', 'Bearer ' + idtkn);
    }

    console.log(this.headers.get('Authorization'));
    // this.setHeader(this.headers, 'Access-Control-Allow-Credentials', true);

    return this.headers;
  }


  setHeader(headers, key , value) {
      return headers.set(key, value);
  }


}
