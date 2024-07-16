import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';




const routes: Routes = [
  {path: 'customer_profile', component:CustomerProfileComponent},
//   {path: 'Passenger_Details', component:PassengerDetailsComponent},
 ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { 
  
}
