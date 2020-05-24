import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationsPageComponent } from './components/locations-page/locations-page.component';


const routes: Routes = [
  { path:'locations', component: LocationsPageComponent },
  { path:'', redirectTo:'locations', pathMatch: 'full' },
  { path:'**', component: LocationsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
