import { Component } from '@angular/core';
import { IPassengerList } from './search-engine.util';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss']
})
export class SearchEngineComponent {
  public selectedPassengerListData: any = [];
  public tripType: string = 'oneWay'
  cities: any[];
  previousStateFormValue : any =null;
  constructor(private sharedService: SharedService){}
  selectedPassengerList(selectedPassenger: IPassengerList) {

    this.selectedPassengerListData = selectedPassenger;

  }
  // @ViewChild(TabView) tabView: TabView;

  ngOnInit() {
    this.sharedService.airLineCity().then(cities => {
      this.cities = cities;
    });
  };

  onChangeTab(event: any) {
    switch (event?.index) {
      case 0:
        this.tripType = 'oneWay';
        break;
      case 1:
        this.tripType = 'roundTrip';
        break;
      case 2:
        this.tripType = 'multiCity';
        break;

      default:
        this.tripType = 'oneWay';
        break;
    }
  }

  searchData(event){
console.log(event);
    this.previousStateFormValue = event;

  }
}
