import { Component } from '@angular/core';
// import { Router, Routes } from '@angular/router';
// import { CustomerComponent } from './customer/customer.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // constructor(private router: Router) {}

  // routes: Routes = [
  //   { path:'/customer', component: CustomerComponent},

  // ];
  title = 'in-city-crm';
  showFiller = false;
}

