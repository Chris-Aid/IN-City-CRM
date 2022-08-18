import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeletingCustomerDialogComponent } from '../deleting-customer-dialog/deleting-customer-dialog.component';
import { SetTerminationComponent } from '../set-termination/set-termination.component';


@Component({
  selector: 'app-customer-card-dialog',
  templateUrl: './customer-card-dialog.component.html',
  styleUrls: ['./customer-card-dialog.component.scss']
})

export class CustomerCardDialogComponent implements OnInit {
  public customers = [];
  constructor(public dialog: MatDialog, public firestore: AngularFirestore) { }

  i: number;
  selected: string = "active";
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
        this.checkMembershipStatus();
      });
  }

  checkMembershipStatus() {
    if (this.customers[this.i].status == 'gekündigt') {
      this.selected = "terminated";
      this.showTerminationInfo = true;
    } else {
      this.selected = "active";
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
      .update({ status: 'active' })
    // this.selected = "active";
    this.checkMembershipStatus();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeletingCustomerDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((a) => {
      console.log(a)
    });
  }
}

export class DeletingCustomerDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeletingCustomerDialogComponent>) {}
}