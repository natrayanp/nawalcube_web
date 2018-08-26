// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const apiurls = {
  // Common routes for all
  all_api_url: /*'http://127.0.0.1:8080'*/'https://wuob9hr3o3.execute-api.ap-south-1.amazonaws.com/dev',
  // Individual routes
  url_signup: 'http://127.0.0.1:8080',
  url_nclogin: 'http://127.0.0.1:8080',
  url_ncloginks: 'http://127.0.0.1:8080',
  url_alllogout: 'http://127.0.0.1:8080',
};


export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyDQg2KUEAJaj-bfdQfp_08T6L2ybnpbOSc',
    authDomain: 'ananew-472d8.firebaseapp.com',
    databaseURL: 'https://ananew-472d8.firebaseio.com',
    projectId: 'ananew-472d8',
    storageBucket: 'ananew-472d8.appspot.com',
    messagingSenderId: '753856447807'
  },
  // url_<screen + Functionality>
  url_signup: apiurls.all_api_url,
  endpt_signup : 'signup',
  url_nclogin: apiurls.all_api_url,
  endpt_nclogin : 'login',
  url_ncloginks: apiurls.all_api_url,
  endpt_ncloginks : 'loginks',
  url_alllogout: apiurls.all_api_url,
  endpt_alllogout : 'logout'
};



export const installation = {
  entityid: 'NAWALCUBE',
  countryid: 'IN'
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
