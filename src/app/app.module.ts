import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocationsPageComponent } from './components/locations-page/locations-page.component';
import { LocationService } from './services/location.service'
import { HttpClientModule } from '@angular/common/http';
import { FacebookModule } from 'ngx-facebook';
import { AddLocationComponent } from './components/add-location/add-location.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    LocationsPageComponent,
    AddLocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FacebookModule.forRoot()
  ],
  providers: [    
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
