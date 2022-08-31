import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SetTerminationComponent } from '../set-termination/set-termination.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customersID;
  customer = [];

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


  selected: string = "aktiv";
  showTerminationInfo = false;



  constructor(private route: ActivatedRoute, public firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getParamsOfCustomer();
  }

  getParamsOfCustomer() {
    this.route.params.subscribe(paramMap => {
      this.customersID = paramMap['id'];
      console.log(paramMap)
    });

    this.getCustomer();
  }

  getCustomer() {
    console.log(this.customersID)
      this.firestore
        .collection('Kunden')
        .doc(this.customersID)
        .valueChanges()
        .subscribe((customer: any) => {
          this.setCustomerInfos(customer);
        });
  }

  setCustomerInfos(customer) {
    this.company = customer.company;
    this.email = customer.email;
    this.entryDate = customer.entryDate;
    this.member = customer.member;
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
  }


  changeToTerminated() {
    this.selected = "terminated";

    const dialogRef = this.dialog.open(SetTerminationComponent);
    dialogRef.componentInstance.customersID = this.customersID;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
}
