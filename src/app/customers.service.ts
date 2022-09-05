import { Injectable } from '@angular/core';
import { AddCustomerDialogComponent } from './add-customer-dialog/add-customer-dialog.component';
import { CustomerComponent } from './customer/customer.component';
import { SetTerminationComponent } from './set-termination/set-termination.component';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  customers:any[] = [];

  branches: any[] = [
    { value: 'Gastronomie', viewValue: 'Gastronomie' },
    { value: 'Modegeschäft', viewValue: 'Modegeschäft' },
    { value: 'Blumengeschäft', viewValue: 'Blumengeschäft' },
    { value: 'Versicherungen', viewValue: 'Versicherungen' },
    { value: 'Buchhandlung', viewValue: 'Buchhandlung' },
    { value: 'Apotheke', viewValue: 'Apotheke' },
    { value: 'Drogerie', viewValue: 'Drogerie' },
    { value: 'Praxis', viewValue: 'Praxis' },
    { value: 'Praxis', viewValue: 'sonstiges' },];

  getBranches(): AddCustomerDialogComponent[] {
    return this.branches;
  }

  getCustomerData(): CustomerComponent[] {
    return this.customers;
  }

  getCustomers(): SetTerminationComponent[] {
    return this.customers;
  }

  constructor() { }
}
