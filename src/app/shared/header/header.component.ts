import { Component, Input, OnInit, SimpleChanges, ChangeDetectorRef  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FilterService, MessageService, PrimeNGConfig } from 'primeng/api';
import { SharedService } from 'src/app/services/shared.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

interface Language {
  name: String;
  val: String;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [SharedService, FilterService, MessageService]
})
export class HeaderComponent implements OnInit {
  public bredcrumbValues = [];
  selectedCountry!: string;
  availableLanguages: Language[] = [];
  selectLanguage: Language = this.availableLanguages[0];
  @Input() currentLink: string = '';
  @Input() currentUserUpdated: any = null;
  public breadCrumps: boolean;
  public currency = new FormControl({ "currency": "QAR" }, { nonNullable: true });
  countries: any[];
  public currencyList: any =[{ "currency": "QAR" }]
  visible: boolean = false;
  loginPage: boolean = false;
  public forgotWindow:boolean = false;
  user:any = null;
  currentUser:any = null;

  public isLoading: boolean = false;

  constructor(private translateService: TranslateService, 
              private _sharedService: SharedService, 
              private messageService: MessageService,  
              private _authenticationService: AuthenticationService,
              private primengConfig: PrimeNGConfig) {
    this.translateService.setDefaultLang('en');
    const browserlang = this.translateService.getBrowserLang();
    this.translateService.use(browserlang);
    this.currentUser = _authenticationService.affliateUser;
    if(Object.keys(this.currentUser).length> 0 ||( this.currentUserUpdated != null) )
    {
      
      this.user= this.currentUser;
    }
    
  }
  translate(event: any) {
    this.translateService.use(event.value);
  }


  ngOnInit() {
    this.availableLanguages = [
      {
        name: 'English',
        val: 'en',
      },
      {
        name: 'Arabic',
        val: 'ar',
      },
    ];
    // this.GetAllCurrencies();
  

  }

  ngAfterViewInit () {
  
    const preffCurrency =  this._sharedService.getLocalStore('currency');
    if (preffCurrency?.length || preffCurrency !== null) {
      // this.currency.setValue({ "currency": preffCurrency})
      let currencyItem =this.currencyList.find((item:any) =>   item.currency === preffCurrency);
      this.currency.patchValue(currencyItem);
      
    }

  }

  logOut()
  {
    localStorage.removeItem('__token');
    localStorage.removeItem('currentUser');
    window.location.reload();
  }
  ngOnChanges(changes: SimpleChanges) {
    // let change = changes['currentLink'];
    this.user = this.currentUserUpdated;
    if (this.currentLink == 'home' || this.currentLink == '') {
      this.breadCrumps = false;
      // alert(this.breadCrumps);
    }
    else {
      this.breadCrumps = true;
      // alert(this.breadCrumps);
    }
  }


  GetAllCurrencies(){
    this._sharedService.GetAllCurrencies().subscribe({
      complete: () => { }, // completeHandler
      error: (error: any) => {  this.messageService.add({severity:'error', summary: 'Error', detail: 'Error Fetching Currency Data. Please Try Again'}); },    // errorHandler 
      next: (data: any) => {
        if (data) {
           this.currencyList = data;
      }

      const preffCurrency =  this._sharedService.getLocalStore('currency');
      if (preffCurrency?.length || preffCurrency !== null) {
        // this.currency.setValue({ "currency": preffCurrency})
        let currencyItem =this.currencyList.find((item:any) =>   item.currency === preffCurrency);
        this.currency.patchValue(currencyItem);
        
      }
      else {
        this._sharedService.setLocalStore("currency",this.currency?.value?.currency);
  
      }
  
    } 
    });
  }

  currencyChange(event){
    this._sharedService.setLocalStore("currency",event?.value.currency);
  }


  showDialog() {
    this.visible = true;
}
showLoginPage() {
    this.loginPage = true;
}
closeLogin(event:boolean){
  this.loginPage = event;
  this.forgotWindow = true;
}


affiliateLoading(event:boolean= false){
  this.isLoading = event;
}

}
