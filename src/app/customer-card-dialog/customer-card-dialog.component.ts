import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DeletingCustomerDialogComponent } from '../deleting-customer-dialog/deleting-customer-dialog.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { SetTerminationComponent } from '../set-termination/set-termination.component';


@Component({
  selector: 'app-customer-card-dialog',
  templateUrl: './customer-card-dialog.component.html',
  styleUrls: ['./customer-card-dialog.component.scss']
})

export class CustomerCardDialogComponent implements OnInit {

  EUdate: any;
  member: string;
  statusOfMembership: string;


  public customers = [];
  IDofCustomer: string;

  constructor(public dialog: MatDialog, public firestore: AngularFirestore) { }

  i: number;
  // member: string;
  selected: string = "aktiv";
  value: any = 1;
  showTerminationInfo = false;

  hovered: number = 1;
  // hovered2: number;

  ngOnInit(): void {
    this.getCustomerInfo();
  }

  getCustomerInfo() {
    this.firestore
      .collection('Kunden')
      .valueChanges()
      .subscribe((customer: any) => {
        this.customers = customer;
        this.IDofCustomer = this.customers[this.i].CustomersID;
        this.checkMembershipStatus();
      });
  }

  checkMembershipStatus() {
    if (this.customers[this.i].status == 'gekündigt') {
      this.selected = "gekündigt";
      this.showTerminationInfo = true;
    } else {
      this.selected = "aktiv";
    }
  }

  changeToTerminated(i: any) {
    this.selected = "terminated";

    const dialogRef = this.dialog.open(SetTerminationComponent);
    dialogRef.componentInstance.i = i;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  changeToActive() {
    this.firestore
      .collection('Kunden')
      .doc(this.customers[this.i].CustomersID)
      .update({ status: 'aktiv' })
    // this.selected = "aktiv";
    this.checkMembershipStatus();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {

    let dialog = this.dialog.open(DeletingCustomerDialogComponent, {

      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialog.afterClosed().subscribe((deleteCustomer) => {
      if (deleteCustomer) {
        this.firestore
          .collection('Kunden')
          .doc(this.customers[this.i].CustomersID)
          .delete();
      }
    });
  }

  name: string;
  company: string;
  membernumber: string;
  tel: string;
  mobile: string;
  email: string;
  street: string;
  postcode: string;
  town: string;
  selectedBranch: string;
  membershipFee: string;
  entryDate;

  openDialog2(i) {
    const editCustomer = this.dialog.open(EditCustomerComponent);
    editCustomer.componentInstance.i = i;
    editCustomer.componentInstance.customers = this.customers;

    editCustomer.afterClosed().subscribe(({
      name, company, membernumber, tel, mobile, email, street, postcode, town, selectedBranch, membershipFee, entryDate }) => {
      console.log(entryDate);
      this.name = name.model,
        this.company = company.model,
        // this.membernumber = membernumber.model;
        this.tel = tel.model,
        this.mobile = mobile.model,
        this.email = email.model,
        this.street = street.model,
        this.postcode = postcode.model,
        this.town = town.model,
        this.selectedBranch = selectedBranch;
        this.membershipFee = membershipFee.model;


      this.firestore
        .collection('Kunden')
        .doc(this.IDofCustomer)
        .update({
          name: this.name,
          company: this.company,
          // membernumber: membernumber ? membernumber : "",
          tel: this.tel,
          mobile: this.mobile,
          email: this.email,
          street: this.street,
          postcode: this.postcode,
          town: this.town,
          // entryDate: entryDate ? entryDate : "",
          selectedBranch: this.selectedBranch,
          membershipFee: this.membershipFee,
          // terminationDate: '',
          // terminationReason: '',
          // status: this.statusOfMembership ? status : "",
          // member: this.member
        });
    });
  }
}

// export class DeletingCustomerDialogComponent {
//   constructor(public dialogRef: MatDialogRef<DeletingCustomerDialogComponent>) {}
// }
