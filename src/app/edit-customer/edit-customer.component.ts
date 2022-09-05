import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  i: number;
  customersID: string;

  customer : any;

  branches: any[] = [];
  selectedBranch: any;

  member: string;

  maxDate: any;
  minDate: any;

  constructor(public cs: CustomersService, public firestore: AngularFirestore, private dialogRef: DialogRef<EditCustomerComponent>) { }

  date : any;

  ngOnInit(): void {}

  showDate(){
    console.log(typeof this.date);
  }

  // closeDialog() {
  //   return {};
  // }


  // onNoClick(): void {
  //   this.editCustomer.close();
  // }
}
