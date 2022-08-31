import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  i: number;
  customersID: string;


  customer = [];


  branches: any[] = [];
  selectedBranch: any;

  member: string;

  maxDate: any;
  minDate: any;

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
  entryDate: string;
  status: string;
  terminationDate: string;
  terminationReason: string;
  // entryDate: any;

  constructor(public cs: CustomersService, public firestore: AngularFirestore) { }

  ngOnInit(): void {



  }


  // onNoClick(): void {
  //   this.editCustomer.close();
  // }
}
