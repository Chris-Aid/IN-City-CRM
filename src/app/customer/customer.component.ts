import { Component, ViewChild } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent {

  customers = [];
  firma: { name: any; company: any; membernumber: any; tel: any; mobile: any; email: any; street: any; postcode: any; town: any; };

  // animal: string;

  // name: string;
  // company: string;
  // membernumber: string;
  // tel: string;
  // mobile: string;
  // email: string;
  // street: string;
  // postcode: string;
  // town: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {

    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(({ 
      name,
      company,
      membernumber, 
      tel,
      mobile,
      email,
      street,
      postcode,
      town, }) => {

        this.firma = {
          name: name,
          company: company,
          membernumber: membernumber,
          tel: tel,
          mobile: mobile,
          email: email,
          street: street,
          postcode: postcode,
          town: town,
        };
        
        this.customers.push(this.firma);
        console.log(this.customers)
    });

  }

}