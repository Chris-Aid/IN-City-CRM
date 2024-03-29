import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { SharedService } from "src/app/shared.service";
import { CustomersService } from "../customers.service";


@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.scss']
})
export class AddCustomerDialogComponent implements OnInit {

  member: 'contact' | 'member' = 'member';

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

  minDate: Date;
  maxDate: Date;

  // noSub = true;

  constructor(public dialogRef: MatDialogRef<AddCustomerDialogComponent>, private customerBranches: CustomersService, public settings: SharedService) { }

  ngOnInit(): void {
    this.branches = this.customerBranches.getBranches();
    this.setDate();
    // this.setColor();
  }

  // onNoClick(): void {
  //   console.log('true')
  // }

  setDate() {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 26, 0, 1);
    this.maxDate = new Date(currentYear + 1, 0, 0);
  }

  // setColor() {
  //   if (this.settings.darkmode) {
  //     document.getElementById('mat-dialog-0').style.backgroundColor = 'black';
  //   }
  // }

}
