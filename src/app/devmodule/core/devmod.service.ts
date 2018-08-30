import { Injectable } from '@angular/core';

import { NatHttpService } from '../../services/http.service';

@Injectable()
export class DevmodService {
  // This is like a middle man service to the app http.service and the feature module

  constructor(private natdevhttp: NatHttpService) { }


  devmodapipost(scrndfunc, data) {
    console.log('inside devmod api post');
    return this.natdevhttp.apipost(scrndfunc, data);
  }


  devmodapiget(scrndfunc) {
    console.log('inside devmod api get');
    return this.natdevhttp.apiget(scrndfunc);
  }


}






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