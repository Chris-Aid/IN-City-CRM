import { Component, OnInit } from '@angular/core';
// import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

customerSection = true;
eventSec = false;
taskManagement = false;
  ngOnInit(): void {
  }


}
