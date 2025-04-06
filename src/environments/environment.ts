// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  apiUrl: 'https://localhost:44396/',
  flightsearchurl: 'http://localhost:51797/',
  flightBookurl: 'http://localhost:56518/',
  webUrl: 'http://localhost:4200/',
    aff_reg_toaddress: ['junaidkp703@gmail.com'],
  booking_confirmation_toaddress: ['junaidkp703@gmail.com'],

  paymentUrl: "https://staging-kongapay-pg.kongapay.com/kpaydirect",
  merchantId: 'konga224',
  mode: 'test',
  publicKey: 'test_pu_19577bfdd503eded912d84d3d203d2f9',
 
  
  firebase: {
    apiKey: 'AIzaSyBP-g5ASdQOgEjBDU8uV_Tx7ki3xyDULdw',
    authDomain: 'travvise.firebaseapp.com',
    projectId: 'travvise',
    storageBucket: 'travvise.appspot.com',
    messagingSenderId: '684818782610',
    appId: '1:684818782610:web:c8b741d108051c98ce094b',
    measurementId: 'G-XP15C138JD',
  },

  emailConfiguration: {
    // DisplayName: 'Konga',
    // From: 'travel@konga.com',
    // Host: 'smtp.sendgrid.net',
    // Password: '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',
    // Port: 25,
    // UserName: 'apikey',
    // UseSSL: false,
    // UseStartTls: true,
    DisplayName: 'Konga Travel & Tours',
    From: 'info@travvise.com',
    Host: 'smtp-mail.outlook.com',
    Password: '@Travel12345',
    Port: 587,
    UserName: 'info@travvise.com',
    UseSSL: false,
    UseStartTls: true,
  },

  guestMail: 'guest@travel.konga.com',
  guestPassword: 'Ugl8q'

};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
