import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {path:'', component:LandingPageComponent},
  // {path:'top-hotel-deals', component:TopHotelDealsComponent},
  // {path: '', loadChildren:()=> import('./shared/shared.module').then((m)=>m.SharedModule)},
  // {path: 'hotel-result', component:HotelResultComponent},
  // {path: 'hotel-details', component:HotelDetailsComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchEngineRoutingModule { }
