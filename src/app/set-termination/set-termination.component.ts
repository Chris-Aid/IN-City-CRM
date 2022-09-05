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
  minDate: Date;
  maxDate: Date;

  customersID: string;

  constructor(private route: ActivatedRoute, public firestore: AngularFirestore, private cs: CustomersService) { }

  ngOnInit(): void {
    this.customersData = this.cs.getCustomers();
    this.setDate();
  }

  setDate() {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 26, 0, 1);
    this.maxDate = new Date(currentYear + 2, 0, 0);
  }

  saveTermination() {
    let dateOfTermination = this.terminationDate.getDate() + "." + (this.terminationDate.getMonth() + 1) + "." + this.terminationDate.getFullYear();

        this.firestore
          .collection('Kunden')
          .doc(this.customersID)
          .update({ status: 'gekündigt', terminationDate: dateOfTermination, terminationReason: this.terminationReason })
  }
}