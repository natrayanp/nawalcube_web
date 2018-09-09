import { Injectable } from '@angular/core';

import { NatHttpService } from '../../services/http.service';
import { cust_types } from '../../shared/interfacess';

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


  get_cust_type_desc(ctype) {
    const myKeys = cust_types.filter(key => key.value === ctype);
    if (myKeys.length > 0) {
      return myKeys[0].viewValue;
    } else {
      return 'Unknown';
    }
  }


  get_cust_type_id(custtypdesc) {
    const myKeys = cust_types.filter(key => key.viewValue === custtypdesc);
    if (myKeys.length > 0) {
      return myKeys[0].value;
    } else {
      return 'Unknown';
    }
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