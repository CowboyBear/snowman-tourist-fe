import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationsPageComponent } from './components/locations-page/locations-page.component';
import { AddLocationComponent } from './components/add-location/add-location.component';


const routes: Routes = [
  { path:'locations', component: LocationsPageComponent },
  { path:'add-location', component: AddLocationComponent },
  { path:'', redirectTo:'locations', pathMatch: 'full' },
  { path:'**', component: LocationsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
