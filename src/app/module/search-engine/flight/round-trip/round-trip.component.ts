import { Component } from '@angular/core';

@Component({
  selector: 'app-round-trip',
  templateUrl: './round-trip.component.html',
  styleUrls: ['./round-trip.component.scss']
})
export class RoundTripComponent {
  countries: any[] | undefined;

  filteredCountries!: any[];
  rangeDates: Date[] | undefined;
  date1: Date | undefined;

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


}
