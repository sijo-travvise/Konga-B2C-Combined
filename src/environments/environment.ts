// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:44396/',
  // readonly flightsearchurl = 'https://kongaflightapi.travvise.com/';
  // readonly flightBookurl = 'https://kongaflightbookingapi.travvise.com/';
  //  readonly vertailUrl = 'https://indigo.travvise.com/'; 
  //  readonly vertailUrl = 'http://verteil.travvise.com/'; 
  //  readonly flightPNRurl = 'https://flightbookingapi.travvise.com/';

  flightsearchurl: 'http://localhost:51797/',
  flightBookurl: 'http://localhost:56518/',
  webUrl: 'http://localhost:65189/',
  // merchantId: 'konga224',
  // mode: 'test',
  // publicKey: 'test_pu_b822553f28b5eaab3b7ed0d092adf74d'
  merchantId: 'ktt',
  mode: 'live',
  publicKey: 'live_pu_12d87995517a6b982d1babc58955eaaa',


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
    DisplayName: 'Konga',
    From: 'travel@konga.com',
    Host: 'smtp.sendgrid.net',
    Password: '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',
    Port: 25,
    UserName: 'apikey',
    UseSSL: false,
    UseStartTls: true,
  },

  guestMail: 'junaid.kp@travvise.com',
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
