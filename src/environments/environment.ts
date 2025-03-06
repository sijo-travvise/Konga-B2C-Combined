// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:44396/',


  // flightsearchurl: 'https://flightapi.travvise.com/',
  // flightBookurl: 'https://kongaflightbookingapi.travvise.com/',
  // vertailUrl: 'https://verteil.travvise.com/',


    // readonly flightsearchurl = 'https://kongaflightapi.travvise.com/';
  // readonly flightBookurl = 'https://kongaflightbookingapi.travvise.com/';
  //  readonly vertailUrl = 'https://indigo.travvise.com/'; 
  //  readonly vertailUrl = 'http://verteil.travvise.com/'; 
  //  readonly flightPNRurl = 'https://flightbookingapi.travvise.com/';


  // readonly flightsearchurl = 'http://192.168.10.213:8080/';
  // readonly flightBookurl = 'http://192.168.10.213:8083/';
  // readonly vertailUrl = 'http://192.168.10.213:8085/';

  // readonly flightsearchurl = 'https://ssjlh50t-51797.inc1.devtunnels.ms/'
  // readonly flightBookurl= 'https://ssjlh50t-56518.inc1.devtunnels.ms/'
  // readonly vertailUrl = 'https://ssjlh50t-7271.inc1.devtunnels.ms/'


 flightsearchurl:'http://localhost:51797/',
  flightBookurl: 'http://localhost:56518/',




  webUrl: 'http://localhost:4000/',
  // merchantId: 'konga224',
  // mode: 'test',
  // publicKey: 'test_pu_b822553f28b5eaab3b7ed0d092adf74d'
  merchantId: 'ktt',
    mode: 'live',
    publicKey: 'live_pu_12d87995517a6b982d1babc58955eaaa'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
