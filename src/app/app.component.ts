import { Component, Input } from '@angular/core';
// import {TranslateService} from '@ngx-translate/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NBK-B2C';
  path: any;
  currentRoute: string;
 
  constructor(private router: Router) {
    this.currentRoute = "Demo";
    this.router.events.subscribe((event: Event) => {

        if (event instanceof NavigationEnd) {
            this.currentRoute = event.url;
            this.path = this.currentRoute.split('/').pop();
        }


    });
  }
  // direction = 'rtl';
  // constructor(private translateService:TranslateService){}
  // translate(event:any){
  //   this.translateService.use(event.target.value)
  // }
}
