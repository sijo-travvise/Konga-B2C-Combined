import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForNotForComponent } from './for-not-for/for-not-for.component';
import { PreLoaderComponent } from './pre-loader/pre-loader.component';


const routes: Routes = [
  // {path:'preloader', component:PreLoaderComponent},
  {path:'404', component:ForNotForComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
