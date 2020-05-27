import { Component, OnInit } from '@angular/core';
import { faMapMarkedAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FacebookService } from 'ngx-facebook';
import { UserService } from 'src/app/services/user.service';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  public logoIcon: IconDefinition = faMapMarkedAlt;
  public user: User;

  constructor(private fb: FacebookService, private userService: UserService, private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    this.user = this.sessionService.getUserFromSession();
  }

  public btnLogin_Click(): void {
    this.fb.login()
      .then((loginResponse) => {
        this.userService.get(loginResponse.authResponse.userID).subscribe(
          (user) => {
            if (user) {
              user.accessToken = loginResponse.authResponse.accessToken;
              this.createSession(user);
            } else {
              this.createNewUser(loginResponse);
            }
          }
        );
      });
  }

  public btnLogout_Click(): void {
    this.fb.logout()
      .then(() => {
        this.sessionService.invalidateSession();        
        this.user = null;
        this.router.navigate(['/locations']);
      })
  }

  public isUserLoggedIn(): boolean {
    return !(this.user === null) && !(this.user === undefined)
  }

  private createNewUser(loginResponse) {
    this.fb.api("/me").then(
      (userInfo) => {
        const user: User = new User();

        user.accessToken = loginResponse.authResponse.accessToken;
        user.id = loginResponse.authResponse.userID;
        user.name = userInfo.name;

        this.userService.post(user).subscribe(
          () => { 
            this.createSession(user);
          }
        );
      },
      (error) => {
        console.log("Error while getting user info from FB API: ", error);
      });
  }

  private createSession(user: User) {
    this.sessionService.createSession(user);
    this.user = user;
  }

}
