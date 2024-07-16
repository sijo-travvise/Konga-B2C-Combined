import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-modify-search-engine',
  templateUrl: './hotel-modify-search-engine.component.html',
  styleUrls: ['./hotel-modify-search-engine.component.scss']
})
export class HotelModifySearchEngineComponent {
  countries: any[] | undefined;

  filteredCountries!: any[];
  rangeDates: Date[] | undefined;
  date1: Date | undefined;

  constructor(private router: Router){}

  filterCountry(event: { query: any; }) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    // for(let i = 0; i < this.countries.length; i++) {
    //     let country = this.countries[i];
    //     if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //         filtered.push(country);
    //     }
    // }

    this.filteredCountries = filtered;
}

resultPage(){
  this.router.navigateByUrl('/hotel-result');
}
}
