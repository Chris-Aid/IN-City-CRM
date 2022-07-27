import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatDialog, } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';
import { CustomerCardDialogComponent } from '../customer-card-dialog/customer-card-dialog.component';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {

  customersID: any;
  searchedCustomer;

  public customers: any[] = [];
  firma: { name: any; company: any; membernumber: any; tel: any; mobile: any; email: any; street: any; postcode: any; town: any; entryDate: any; selectedBranch: any; membershipFee: any; terminationDate: any; terminationReason: any; };

  constructor(private router: Router, public dialog: MatDialog, public firestore: AngularFirestore, private route: ActivatedRoute, private customerInfo: CustomersService) { }

    ngOnInit(): void {
    this.getCustomer();
    this.filterOptions();
  }

  getCustomer() {
    this.firestore
    .collection('Kunden')
    .valueChanges()
    .subscribe((customer: any) => {
      this.customerInfo.customers = customer;
      this.customers = customer;
    });
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(AddCustomerDialogComponent);

    dialogRef.afterClosed().subscribe(({
      name, company, membernumber, tel, mobile, email, street, postcode, town, entryDate, selectedBranch, membershipFee }) => {
      let EUdate = entryDate.getDate() + "." + (entryDate.getMonth() + 1) + "." + entryDate.getFullYear()

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
        entryDate: EUdate,
        selectedBranch: selectedBranch,
        membershipFee: membershipFee,
        terminationDate: '',
        terminationReason: '',
      };

      this.firestore
        .collection('Kunden')
        .add(this.firma)
        .then((customerInfo: any) => {

          this.firestore
            .collection('Kunden')
            .doc(customerInfo.id)
            .update({ CustomersID: customerInfo.id });
        });
      // window.location.reload();
    });
  }

  openDialog2(i) {
    const dialogRef = this.dialog.open(CustomerCardDialogComponent);
    dialogRef.componentInstance.i = i;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    // console.log(this.customersID)
    // this.router.navigateByUrl('/' + this.customersID)
  }

  filterOptions() {
    setTimeout(() => {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    }, 600);

  }

  myControl = new FormControl('');
  options: any[] = this.customers;
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(this.options)
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
