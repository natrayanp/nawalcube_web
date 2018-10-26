import { Injectable } from '@angular/core';
import { cust_types } from '../shared/interfacess';

@Injectable({
  providedIn: 'root'
})
export class GenserviceService {

  constructor() { }

  // Variables for /authorise/auth to /authorise/allow : START



  // Variables for /authorise/auth to /authorise/allow : END
  

  get_cust_type_desc(ctype) {
    console.log(ctype);
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
