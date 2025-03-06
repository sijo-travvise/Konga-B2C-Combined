import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MoreDealDetailsComponent } from './landing-page/deals-section/more-deal-details/more-deal-details.component';

const routes: Routes = [
  {path:'', component:LandingPageComponent},
  {
    path: 'deals/:deal-identity-Code',
    component: MoreDealDetailsComponent,
    data: {
      title: 'Home',
      breadcrumb: [
        {
          label: 'Home',
          url: '/home',
        },
        {
          label: '{{deal-identity-Code}}',
          url: '',
        },
      ],
    },
  },
  // {path: '', loadChildren:()=> import('./shared/shared.module').then((m)=>m.SharedModule)},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
