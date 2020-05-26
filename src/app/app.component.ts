import { Component } from '@angular/core';
import { FacebookService, InitParams, LoginStatus } from 'ngx-facebook';
import { UserService } from './services/user.service';
import { User } from './models/User';
import { SessionService } from './services/session.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'touristApp';

  constructor(private fb: FacebookService, private userService: UserService, private sessionService: SessionService) {
    this.initFbService();
    this.validateLoginStatus();
  }

  private validateLoginStatus(): void {
    this.fb.getLoginStatus()
      .then((loginStatus) => {
        if (loginStatus.status === "connected") {
          this.createUserSession(loginStatus);
        }
        else {
          this.sessionService.invalidateSession();
        }
      })
      .catch((error) => {
        console.log("Error getting loginStatus: ", error);
      });
  }

  private createUserSession(loginStatus: LoginStatus): void {
    this.userService.get(loginStatus.authResponse.userID).subscribe((user) => {
      user.accessToken = loginStatus.authResponse.accessToken
      this.sessionService.createSession(user);
    }, (error) => {
      console.log("Error getting user information: ", error);
    });
  }

  private initFbService(): void {
    let initParams: InitParams = {
      appId: '335073564138021',
      xfbml: true,
      version: 'v7.0'
    };
    this.fb.init(initParams);
  }
}
