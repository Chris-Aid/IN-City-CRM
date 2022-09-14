import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public firestore: AngularFirestore) { }

  fees = [];
  sum = 0;

  ngOnInit(): void {
    this.getDataFromFirebase();
  }

  getDataFromFirebase() {
    this.firestore
      .collection('Kunden')
      .valueChanges()
      .subscribe((customer: any) => {
        this.getMembershipFees(customer);
        // console.log(customer)
      });
  }

  getMembershipFees(customer) {
    for(let i = 0; i < customer.length; i++ ) {
      if(customer[i].status == 'aktiv' && customer[i].member == 'member')
      this.fees.push(customer[i].membershipFee);
      console.log(customer[i].membershipFee)
      // this.sum += 3;
    }

    // console.log(this.sum)
    
  }
}
