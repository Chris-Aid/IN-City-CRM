import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
// import { Router, Routes } from '@angular/router';
// import { CustomerComponent } from './customer/customer.component';


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
    // this.setColor();
  }

  // setColor() {
  //   if (this.settings.darkmode) {
  //     document.getElementById('mat-dialog-0').style.backgroundColor = 'black';
  //   }
  // }

}

