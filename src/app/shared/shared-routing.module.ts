import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForNotForComponent } from './for-not-for/for-not-for.component';
import { PreLoaderComponent } from './pre-loader/pre-loader.component';
import { AffliateComponent } from './affliate/affliate.component';
import { TermsAndConditionsComponent } from './affliate/terms-and-conditions/terms-and-conditions.component';


const routes: Routes = [
  // {path:'preloader', component:PreLoaderComponent},
  {path:'404', component:ForNotForComponent},
  {path:'affiliate', component:AffliateComponent},
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
