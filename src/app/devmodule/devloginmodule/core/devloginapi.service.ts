import { Injectable } from '@angular/core';

import { NatHttpService } from '../../../services/http.service';


@Injectable()
export class DevloginapiService {
  // This is like a middle man service to the app http.service and the feature module

  constructor(private natdevhttp: NatHttpService) { }


  loginapipost(scrndfunc, data) {
    return this.natdevhttp.apipost(scrndfunc, data);
  }


  loginapiget(scrndfunc) {
    console.log('inside dev api');
    return this.natdevhttp.apiget(scrndfunc);
  }


}