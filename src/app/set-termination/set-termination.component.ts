import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-set-termination',
  templateUrl: './set-termination.component.html',
  styleUrls: ['./set-termination.component.scss']
})
export class SetTerminationComponent implements OnInit {

  terminationDate: any;
  terminationReason: any;

  myID: any;

  constructor(private route: ActivatedRoute, public firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveTermination() {
    let dateOfTermination = this.terminationDate.getDate() + "." + (this.terminationDate.getMonth() + 1) + "." + this.terminationDate.getFullYear();
    console.log(dateOfTermination)

    // this.route.params.subscribe((params) => {
    //   console.log(params);

    // });
    this.firestore
      .collection('Kunden', ref => ref.where('name', '==', 'a'))
      .valueChanges()
      .subscribe((a: any) => {
        this.myID = a[0].CustomersID;

        this.firestore
      .collection('Kunden')
      .doc(a[0].CustomersID)
      .update({status: 'gekündigt'})

      })

      


    // .doc('B8LCDqi0ZO3i5trNbAey')
    //   .update({ terminationDate: dateOfTermination, terminationReason: this.terminationReason });
  }
}