import { Component, OnInit } from '@angular/core';
import { Router, Routes, ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponent } from '../app.component';
import { CustomerComponent } from '../customer/customer.component';
// import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {


  ngOnInit(): void {
  }


}
