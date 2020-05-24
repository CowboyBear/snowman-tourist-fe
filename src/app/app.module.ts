import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocationsPageComponent } from './components/locations-page/locations-page.component';
import { LocationService } from './services/location.service'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    LocationsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [    
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
