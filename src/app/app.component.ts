import { Component } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'touristApp';

  constructor(private fb: FacebookService) {
 
    let initParams: InitParams = {
      appId: '335073564138021',
      xfbml: true,
      version: 'v7.0'
    };
 
    this.fb.init(initParams);
  }
}
