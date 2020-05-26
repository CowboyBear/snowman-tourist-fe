import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/Location';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  private readonly LOCATION_ENDPOINT = environment.apiUrl + '/location';

  constructor(private http: HttpClient) { }

  public get(): Observable<Array<Location>> {
    return this.http.get<Array<Location>>(this.LOCATION_ENDPOINT);
  }


  public post(formData: FormData): Observable<Location>{
    return this.http.post<Location>(this.LOCATION_ENDPOINT, formData);
  }
}
