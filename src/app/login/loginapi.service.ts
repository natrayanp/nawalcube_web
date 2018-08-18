import { Injectable } from '@angular/core';

import { NatHttpService } from '../services/http.service';


@Injectable()
export class LoginapiService {
  // This is like a middle man service to the app http.service and the feature module

  constructor(private nathttp: NatHttpService) { }


  loginapipost(scrndfunc, data) {
    return this.nathttp.apipost(scrndfunc, data);
  }


  loginapiget(scrndfunc) {
    return this.nathttp.apiget(scrndfunc);
  }


}
