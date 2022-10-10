import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  mode: boolean;

  constructor(public settings: SharedService) { }

  ngOnInit(): void {
    const mode = JSON.parse(localStorage.getItem('darkmode'));
    this.settings.darkmode = mode;
  }

  customerSection = false;
  eventSec = false;
  taskManagement = false;
  help = false;
  dashboard = true;

  dontHideSidebar(e) {
    e.stopPropagation();
  }

  saveToLocalStorage() {
    setTimeout(() => {
      localStorage.setItem('darkmode', JSON.stringify(this.settings.darkmode));
    }, 200);
  }
}
