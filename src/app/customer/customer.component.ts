import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, } from '@angular/material/dialog';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';
import { CustomerCardDialogComponent } from '../customer-card-dialog/customer-card-dialog.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {

  public customers = [];
  firma: { name: any; company: any; membernumber: any; tel: any; mobile: any; email: any; street: any; postcode: any; town: any; entryDate: any; };

  constructor(public dialog: MatDialog, public firestore: AngularFirestore) { }

  openDialog(): void {

    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(({
      name, company, membernumber, tel, mobile, email, street, postcode, town, entryDate }) => {

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
        entryDate: entryDate.toISOString().split('T')[0],
      };

      console.log(entryDate)

      this.firestore
        .collection('Kunden')
        .add(this.firma)
    });
  }

  openDialog2(i) {
    const dialogRef = this.dialog.open(CustomerCardDialogComponent);
    dialogRef.componentInstance.i = i;
    console.log(i)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.firestore
      .collection('Kunden')
      .valueChanges()
      .subscribe((customer: any) => {
        this.customers = customer;
      });
  }
}
