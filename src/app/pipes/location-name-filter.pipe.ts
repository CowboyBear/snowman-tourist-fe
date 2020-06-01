import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../models/Location';

@Pipe({
  name: 'locationNameFilter'
})
export class LocationNameFilterPipe implements PipeTransform {

  transform(locations: Location[], name: string): any {
    if(!locations || !name){
      return locations;
    } 
    
    return locations.filter(location => location.name.toLowerCase().includes(name.toLowerCase()));
  }

}
