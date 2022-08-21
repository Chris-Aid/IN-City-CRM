import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerCardDialogComponent } from '../customer-card-dialog/customer-card-dialog.component';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  i: number;
  customers: any[] = [];
  branches: any[] = [];
  selectedBranch: any;

  member: string;

  maxDate: any;
  minDate: any;

  membershipFee: any;
  name: string;
  company: string;
  membernumber: string;
  tel: string;
  mobile: string;
  email: string;
  street: string;
  postcode: string;
  town: string;
  entryDate: string;
  // entryDate: any;

  constructor(private customerBranches: CustomersService, public editCustomer: MatDialogRef<CustomerCardDialogComponent>) { }

  ngOnInit(): void {
    this.getCustomerInfos();
    this.branches = this.customerBranches.getBranches();

    this.setDate();
  }

  getCustomerInfos() {
    this.member = this.customers[this.i].member;
    this.selectedBranch = this.customers[this.i].selectedBranch;
  }

  setDate() {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 26, 0 , 1);
    this.maxDate = new Date(currentYear + 1, 0, 0);
  }

  onNoClick(): void {
    this.editCustomer.close();
  }
}
