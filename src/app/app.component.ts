import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from './shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public settings: SharedService) {

  }

  title = 'in-city-crm';
  showFiller = false;

  ngOnInit() {
  }
}

