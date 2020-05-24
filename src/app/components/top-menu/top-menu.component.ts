import { Component, OnInit } from '@angular/core';
import { faMapMarkedAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  public logoIcon: IconDefinition = faMapMarkedAlt;

  constructor() { }

  ngOnInit() {
  }

}
