import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { Firestore } from '@angular/fire/firestore';
import { MatDialog, } from '@angular/material/dialog';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {

  customers = [];
  firma: { name: any; company: any; membernumber: any; tel: any; mobile: any; email: any; street: any; postcode: any; town: any; };

  constructor(public dialog: MatDialog, public firestore: AngularFirestore) { }

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

      // this.customers.push(this.firma);
      // console.log(this.customers);

      this.firestore
        .collection('Kunden')
        .add(this.firma)
    });
  }


  ngOnInit(): void {
    this.firestore
      .collection('Kunden')
      // .doc(this.myGameId)
      .valueChanges()
      .subscribe((customer: any) => {
        // console.log(customer)
       this.customers = customer;
       console.log(this.customers)
      });
  }
}