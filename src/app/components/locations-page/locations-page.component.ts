import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '../../models/Location';

@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html',
  styleUrls: ['./locations-page.component.scss']
})
export class LocationsPageComponent implements OnInit {

  public locations: Location[];

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.get().subscribe((locations: Location[]) => {
      this.locations = locations;
    });
  }

}
