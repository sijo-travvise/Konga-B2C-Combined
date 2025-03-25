export const environment = {
  production: true,

  // apiUrl: 'https://kongaapi.konga.com:553/',
  // webUrl: 'https://travel.konga.com/',
  // flightsearchurl: 'https://FlightSearch.konga.com/',
  // flightBookurl: 'https://FlightBook.konga.com/',

  apiUrl: 'https://kongaapi.travvise.com/',
  webUrl: 'https://b2c-konga.travvise.com/',
  flightsearchurl: 'https://kongaflightapi.travvise.com/',
  flightBookurl: 'https://kongaflightbookingapi.travvise.com/',

  paymentUrl: "https://kongapay-pg.kongapay.com/kpaydirect",

  merchantId: 'ktt',
  mode: 'live',
  publicKey: 'live_pu_12d87995517a6b982d1babc58955eaaa',

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

  guestMail: 'guest@travel.konga.com',
  guestPassword: 'Ugl8q',

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
