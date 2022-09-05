import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DeletingCustomerDialogComponent } from '../deleting-customer-dialog/deleting-customer-dialog.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { SetTerminationComponent } from '../set-termination/set-termination.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customersID;
  customer = [];
  hovered: number = 1;

  company: string;
  email: string;
  entryDate: string;
  member: string;
  membernumber: string;
  membershipFee: string;
  mobile: string;
  name: string;
  postcode: string;
  selectedBranch: string;
  status: string;
  street: string;
  tel: string;
  terminationDate: string;
  terminationReason: string;
  town: string;

  dateOfEntry: any;

  selected: string = "aktiv";
  showTerminationInfo = false;

  constructor(private route: ActivatedRoute, public firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getParamsOfCustomer();
  }

  getParamsOfCustomer() {
    this.route.params.subscribe(paramMap => {
      this.customersID = paramMap['id'];
    });

    this.getCustomer();
  }

  getCustomer() {
    this.firestore
      .collection('Kunden')
      .doc(this.customersID)
      .valueChanges()
      .subscribe((customer: any) => {
        this.updateCustomerInfos(customer);
        this.customer = customer;
      });
  }

  updateCustomerInfos(customer: any) {
    if (customer.date instanceof Date) {
      this.dateOfEntry = customer.entryDate.getDate() + "." + (customer.entryDate.getMonth() + 1) + "." + customer.entryDate.getFullYear();
    } else {
      this.dateOfEntry = customer.entryDate;
    }

    this.company = customer.company;
    this.email = customer.email;
    this.member = customer.member;
    this.entryDate = this.dateOfEntry;
    this.membernumber = customer.membernumber;
    this.membershipFee = customer.membershipFee;
    this.mobile = customer.mobile;
    this.name = customer.name;
    this.postcode = customer.postcode;
    this.selectedBranch = customer.selectedBranch;
    this.status = customer.status;
    this.street = customer.street;
    this.tel = customer.tel;
    this.terminationDate = customer.terminationDate;
    this.terminationReason = customer.terminationReason;
    this.town = customer.town;

    this.checkMembershipStatus();
  }


  changeToTerminated() {
    this.selected = "terminated";

    const dialogRef = this.dialog.open(SetTerminationComponent);
    dialogRef.componentInstance.customersID = this.customersID;
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  changeToActive() {
    this.firestore
      .collection('Kunden')
      .doc(this.customersID)
      .update({ status: 'aktiv' })
    // this.selected = "aktiv";
    this.checkMembershipStatus();
  }

  checkMembershipStatus() {
    if (this.status == 'gekündigt') {
      this.selected = "gekündigt";
      this.showTerminationInfo = true;
    } else {
      this.selected = "aktiv";
    }
  }

  editCustomer() {
    const editCustomer = this.dialog.open(EditCustomerComponent, { disableClose: true });

    // change date format here

    editCustomer.componentInstance.customer = this.customer;
    console.log(this.customer);

    editCustomer.afterClosed().subscribe(({
      customer }) => {
      this.updateCustomerInfos(customer);
      this.updateFirestore();
    });
  }

  updateFirestore() {
    this.firestore
      .collection('Kunden')
      .doc(this.customersID)
      .update({
        name: this.name,
        company: this.company,
        membernumber: this.membernumber,
        tel: this.tel,
        mobile: this.mobile,
        email: this.email,
        street: this.street,
        postcode: this.postcode,
        town: this.town,
        entryDate: this.entryDate,
        selectedBranch: this.selectedBranch,
        membershipFee: this.membershipFee,
        // terminationDate: '',
        // terminationReason: '',
        // status: this.statusOfMembership,
        member: this.member
      });
  }

  openDialog(): void {
    let dialog = this.dialog.open(DeletingCustomerDialogComponent);

    dialog.afterClosed().subscribe((deleteCustomer) => {
      if (deleteCustomer) {
        this.firestore
          .collection('Kunden')
          .doc(this.customersID)
          .delete();
      }
    });
  }
}
