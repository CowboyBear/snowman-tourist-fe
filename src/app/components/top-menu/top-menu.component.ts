import { Component, OnInit } from '@angular/core';
import { faMapMarkedAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FacebookService } from 'ngx-facebook';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  public logoIcon: IconDefinition = faMapMarkedAlt;
  public isUserAuthenticated: boolean = false;

  constructor(private fb: FacebookService) { }

  ngOnInit() {
    this.fb.getLoginStatus()
      .then((loginStatus) => {
        if (loginStatus.status === "connected") {
          this.isUserAuthenticated = true;
        }
      })
      .catch((error) => {
        console.log("Error getting loginStatus: ", error);
      });
  }

  public btnLogin_Click(): void {
    this.fb.login()
    .then(() => {
      this.isUserAuthenticated = true;      
    });    
  }

  public btnLogout_Click(): void {
    this.fb.logout()
    .then(() => {
      this.isUserAuthenticated = false;      
    })
  }

}
