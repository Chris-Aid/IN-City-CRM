import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

mode: boolean;

  constructor(public settings: SharedService){}

  ngOnInit(): void {

    const mode = JSON.parse(localStorage.getItem('darkmode'));
    this.settings.darkmode = mode;
    console.log(this.settings.darkmode)
  }

  customerSection = true;
  eventSec = false;
  taskManagement = false;
  help = false;
  dashboard = false;

  dontHideSidebar(e) {
    e.stopPropagation();
  }

  saveToLocalStorage() {
    setTimeout(() => {
      localStorage.setItem('darkmode', JSON.stringify(this.settings.darkmode));
      console.log(this.settings.darkmode) 
    }, 200);
  }
}
