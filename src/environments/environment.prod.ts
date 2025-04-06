export const environment = {
  production: true,

  //#region PRODUCTION
  apiUrl: 'https://kongaapi.konga.com:553/',
  webUrl: 'https://travel.konga.com/',
  flightsearchurl: 'https://FlightSearch.konga.com/',
  flightBookurl: 'https://FlightBook.konga.com/',
  
  aff_reg_toaddress: ['corporatetravel@konga.com','abiola.bakare@konga.com','yusuf.babatunde@konga.com','joy.okorie@konga.com','akeem.adeyemi@konga.com','junaidkp703@gmail.com'],
  booking_confirmation_toaddress: ['abiola.bakare@konga.com','yusuf.babatunde@konga.com','joy.okorie@konga.com','akeem.adeyemi@konga.com','junaidkp703@gmail.com'],

  paymentUrl: "https://kongapay-pg.kongapay.com/kpaydirect",
  merchantId: 'ktt',
  mode: 'live',
  publicKey: 'live_pu_12d87995517a6b982d1babc58955eaaa',

  
  guestMail: 'guest@konga.com',
  guestPassword: 'Guest!@#123',

  //#endregion



  //#region DEMO
  // apiUrl: 'https://kongaapi.travvise.com/',
  // webUrl: 'https://b2c-konga.travvise.com/',
  // flightsearchurl: 'https://kongaflightapi.travvise.com/',
  // flightBookurl: 'https://kongaflightbookingapi.travvise.com/',
  // aff_reg_toaddress: ['junaidkp703@gmail.com'],
  // booking_confirmation_toaddress: ['junaidkp703@gmail.com'],

  // paymentUrl: "https://kongapay-pg.kongapay.com/kpaydirect",
  // merchantId: 'ktt',
  // mode: 'live',
  // publicKey: 'live_pu_12d87995517a6b982d1babc58955eaaa',

  // guestMail: 'guest@travel.konga.com',
  // guestPassword: 'Ugl8q',

  //#endregion


  emailConfiguration: {
    DisplayName: 'Konga Travel & Tours',
    From: 'info@travvise.com',
    Host: 'smtp-mail.outlook.com',
    Password: '@Travel12345',
    Port: 587,
    UserName: 'info@travvise.com',
    UseSSL: false,
    UseStartTls: true,
  },
  firebase: {
    apiKey: "AIzaSyB1YhBpsp9hEDT4bp9o8eBnWD8alPRkp-c",
    authDomain: "travvise-live.firebaseapp.com",
    projectId: "travvise-live",
    storageBucket: "travvise-live.appspot.com",
    messagingSenderId: "417010332824",
    appId: "1:417010332824:web:d40d91d2ab6588fbe58ced",
    measurementId: "G-PDN0FPWVH3"
  }
};
