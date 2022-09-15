import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public firestore: AngularFirestore, private _formBuilder: FormBuilder, public settings: SharedService) { }

  isChecked = false;
  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });

  onFormSubmit() {
    alert(JSON.stringify(this.formGroup.value, null, 2));
  }

  fees = [];
  sum: number = 0;
  show: boolean = false;
  amountOfCustomers: number = 0;
  amountOfTerminatedCustomers: number = 0;
  terminatedCustomer = [];

  ngOnInit(): void {
    this.getDataFromFirebase();
  }

  getDataFromFirebase() {
    this.firestore
      .collection('Kunden')
      .valueChanges()
      .subscribe((customer: any) => {
        this.getMembershipFees(customer);
        this.getTerminatedCustomer(customer);
      });
  }

  getMembershipFees(customer) {
    for (let i = 0; i < customer.length; i++) {
      if (customer[i].status == 'aktiv' && customer[i].member == 'member') {
        // summs up all membershipFees
        this.sum += +customer[i].membershipFee;

        // findes out how many custermers the company has
        this.amountOfCustomers++;
      }
    }
    //formatts the sum
    let moneyFromCustomer = +this.sum.toFixed(2);
    this.sum = moneyFromCustomer;
  }

  getTerminatedCustomer(customer) {
    for (let i = 0; i < customer.length; i++) {
      if (customer[i].status == 'gekündigt') {

        this.terminatedCustomer.push(
          {
            name: customer[i].company,
            reason: customer[i].terminationReason,
            date: customer[i].terminationDate
          }
        );
        this.amountOfTerminatedCustomers++;
      }
    }
  }
}
