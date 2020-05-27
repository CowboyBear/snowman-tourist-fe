import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '../../models/Location';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html',
  styleUrls: ['./locations-page.component.scss']
})
export class LocationsPageComponent implements OnInit {

  public locations: Location[];

  private readonly UPLOADED_FILES_DIR = environment.apiUrl + '/uploadedfiles/';

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.get().subscribe((locations: Location[]) => {
      this.locations = locations;
    });    
  }

  public getLocationPicturePath(location: Location): string {
    return location.picturePath != null ? 
      this.UPLOADED_FILES_DIR + location.picturePath : 
      '/assets/img/default-location-img.png'
  }
}
