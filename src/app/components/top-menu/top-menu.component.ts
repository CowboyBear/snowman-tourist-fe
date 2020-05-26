import { Component, OnInit } from '@angular/core';
import { faMapMarkedAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FacebookService } from 'ngx-facebook';
import { UserService } from 'src/app/services/user.service';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  public logoIcon: IconDefinition = faMapMarkedAlt;
  public user: User;

  constructor(private fb: FacebookService, private userService: UserService, private sessionService: SessionService) { }

  ngOnInit() {
    this.user = this.sessionService.getUserFromSession();
   }

  public btnLogin_Click(): void {
    this.fb.login()
    .then(() => {  
      //window.location.reload();
    });    
  }

  public btnLogout_Click(): void {
    this.fb.logout()
    .then(() => {
      this.sessionService.invalidateSession();     
    })
  }

  public isUserLoggedIn(): boolean{    
    return !(this.user === null) && !(this.user === undefined)
  }

}
