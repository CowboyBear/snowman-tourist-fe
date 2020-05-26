import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { LoginStatus } from 'ngx-facebook';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_ENDPOINT = environment.apiUrl + '/user';

  constructor(private http: HttpClient) { }

  public get(userId: string): Observable<User> {
    return this.http.get<User>(this.USER_ENDPOINT + '/' + userId);
  }

  public post(user: User): Observable<User> {
    return this.http.post<User>(this.USER_ENDPOINT, this.createPayload(user));
  }
  
  createPayload(user: User): any {
    return {
      Id: user.id,
      Name: user.name
    };
  }
}
