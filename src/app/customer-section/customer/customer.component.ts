import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { SharedService } from "src/app/shared.service";

import { AddCustomerDialogComponent } from "../add-customer-dialog/add-customer-dialog.component";
import { CustomersService } from "../customers.service";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CustomerComponent implements OnInit {

  memberStatus: 'gekündigt' | 'aktiv' | 'all' = 'all';

  EUdate: any;
  member: string;
  statusOfMembership: string;

  customersID: any;
  searchedCustomer: any;
  searchText: any;

  public customers: any[] = [];
  firma: { name: any; company: any; membernumber: any; tel: any; mobile: any; email: any; street: any; postcode: any; town: any; entryDate: any; selectedBranch: any; membershipFee: any; terminationDate: any; terminationReason: any; status: any; member: any; };

  constructor(private router: Router, public dialog: MatDialog, public firestore: AngularFirestore, private route: ActivatedRoute, private customerInfo: CustomersService, public settings: SharedService) { }

  async ngOnInit(): Promise<void> {
    this.getCustomer();
  }

  async getCustomer() {
    this.firestore
      .collection('Kunden')
      .valueChanges()
      .subscribe((customer: any) => {
        this.customerInfo.customers = customer;
        
        let sortedCustomer = customer.sort(function(a,b) {
          return a.company > b.company ? 1 : (a.company === b.company ? 0 : -1 );
        })
        this.customers = sortedCustomer;
      });
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(AddCustomerDialogComponent, { 
      disableClose: true,
      panelClass: "darkmodeDialog", });

    dialogRef.afterClosed().subscribe(({
      name, company, membernumber, tel, mobile, email, street, postcode, town, entryDate, selectedBranch, membershipFee, member }) => {

      if (company && company.length > 0) {

        // this.member = member;
        this.setDateAndMemberstatus(entryDate, member);

        this.firma = {
          name: name ? name : "",
          company: company ? company : "",
          membernumber: membernumber ? membernumber : "",
          tel: tel ? tel : "",
          mobile: mobile ? mobile : "",
          email: email ? email : "",
          street: street ? street : "",
          postcode: postcode ? postcode : "",
          town: town ? town : "",
          entryDate: this.EUdate,
          selectedBranch: selectedBranch ? selectedBranch : "",
          membershipFee: membershipFee ? membershipFee : "",
          terminationDate: '',
          terminationReason: '',
          status: this.statusOfMembership,
          member: member
        };
        this.saveToFirestore();
      }
    });
  }

  setDateAndMemberstatus(entryDate, member) {
    if (entryDate) {
      this.EUdate = entryDate.getDate() + "." + (entryDate.getMonth() + 1) + "." + entryDate.getFullYear();
    } else {
      this.EUdate = '';
    }

    if (member === 'member') {
      this.statusOfMembership = 'aktiv'
    } else {
      this.statusOfMembership = 'inaktiv'
    }
  }

  saveToFirestore() {
    this.firestore
    .collection('Kunden')
    .add(this.firma)
    .then((customerInfo: any) => {
      this.firestore
        .collection('Kunden')
        .doc(customerInfo.id)
        .update({ CustomersID: customerInfo.id });
    });
  }

}