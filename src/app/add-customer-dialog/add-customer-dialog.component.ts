import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.scss']
})
export class AddCustomerDialogComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  //branches are stored in customers service
  branches: any[] = [];

  selectedBranch: any;
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
  entryDate: any;
  // value: any;

  constructor(public dialogRef: MatDialogRef<AddCustomerDialogComponent>, private customerBranches: CustomersService) { }


  ngOnInit(): void {
    this.branches = this.customerBranches.getBranches();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
 
}
