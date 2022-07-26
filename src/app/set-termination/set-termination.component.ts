import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-set-termination',
  templateUrl: './set-termination.component.html',
  styleUrls: ['./set-termination.component.scss']
})
export class SetTerminationComponent implements OnInit {

  terminationDate: any;
  terminationReason: any;
  customersData: any;

  myID: any;
  i: number;

  constructor(private route: ActivatedRoute, public firestore: AngularFirestore, private customers: CustomersService) { }

  ngOnInit(): void {
    this.customersData = this.customers.getCustomers();

    console.log(this.customersData[this.i].name)

  }

  saveTermination() {
    let dateOfTermination = this.terminationDate.getDate() + "." + (this.terminationDate.getMonth() + 1) + "." + this.terminationDate.getFullYear();

    this.firestore
      .collection('Kunden', ref => ref.where('name', '==', this.customersData[this.i].name))
      .valueChanges()
      .subscribe((a: any) => {
        console.log(a)
        this.firestore
      .collection('Kunden')
      .doc(a[0].CustomersID)
      .update({status: 'gekündigt', terminationDate: dateOfTermination, terminationReason: this.terminationReason})
      })

      


    // .doc('B8LCDqi0ZO3i5trNbAey')
    //   .update({ terminationDate: dateOfTermination, terminationReason: this.terminationReason });
  }
}