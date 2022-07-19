import { Component, ViewChild } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}