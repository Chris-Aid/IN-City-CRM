import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-customer-card-dialog',
  templateUrl: './customer-card-dialog.component.html',
  styleUrls: ['./customer-card-dialog.component.scss']
})
export class CustomerCardDialogComponent implements OnInit {
  public customers = [];
  constructor(public dialog: MatDialog, public firestore: AngularFirestore) { }
  i: number;

  ngOnInit(): void {
    this.firestore
    .collection('Kunden')
    .valueChanges()
    .subscribe((customer: any) => {
     this.customers = customer;
     console.log(this.customers)
    });
  }

}
