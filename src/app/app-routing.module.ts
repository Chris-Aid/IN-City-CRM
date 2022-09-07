import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerComponent } from './customer/customer.component';
import { HelpSectionComponent } from './help-section/help-section.component';
// import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  // { path:'', component: AppComponent},
  { path:'', component: CustomerComponent},
  { path:'customer/:id', component: CustomerDetailsComponent},
  {path: 'help', component: HelpSectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(public router: Router) {}
}
