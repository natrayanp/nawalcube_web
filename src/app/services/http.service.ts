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
  apipost(scrndfunc, data) {
    console.log(environment['url_' + scrndfunc] + '/' + environment['endpt_' + scrndfunc]);
    return this.http.post(
                          environment['url_' + scrndfunc] + '/' + environment['endpt_' + scrndfunc],
                          data,
                          {observe: 'response'}
                          // {headers: this.set_http_headers(conttyp), observe: 'response', withCredentials: true}
                        );
  }

  // GET request to API
  apiget(scrndfunc) {
    return this.http.get(
                          environment[scrndfunc + 'url'] + '/' + environment[scrndfunc]
                         // {headers: this.set_http_headers(conttyp), observe: 'response'}
                        );
  }



}
