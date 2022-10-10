import { Input, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CustomerDetailsComponent } from './customer-section/customer-details/customer-details.component';
import { CustomerComponent } from './customer-section/customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpSectionComponent } from './help-section/help-section.component';
import { ArchiveComponent } from './task-section/archive/archive.component';
import { EventComponent } from './task-section/event/event.component';
import { TasksOverviewComponent } from './task-section/tasks-overview/tasks-overview.component';
import { TrashComponent } from './task-section/trash/trash.component';


const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'customer/:id', component: CustomerDetailsComponent },
  { path: 'help', component: HelpSectionComponent },
  { path: 'tasks', component: TasksOverviewComponent },
  { path: '', component: DashboardComponent },
  { path: 'tasks/task/:id', component: EventComponent },
  { path: 'tasks/task/:id/archive', component: ArchiveComponent },
  { path: 'tasks/task/:id/trash', component: TrashComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(public router: Router) { }

}
