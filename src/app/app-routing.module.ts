import { Input, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CustomerDetailsComponent } from './customer-section/customer-details/customer-details.component';
import { CustomerComponent } from './customer-section/customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpSectionComponent } from './help-section/help-section.component';
import { TasksOverviewComponent } from './task-section/tasks-overview/tasks-overview.component';


const routes: Routes = [
  { path:'', component: CustomerComponent},
  { path:'customer/:id', component: CustomerDetailsComponent},
  {path: 'help', component: HelpSectionComponent},
  {path: 'tasks', component: TasksOverviewComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(public router: Router) {}

}
