import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.scss']
})
export class AddCustomerDialogComponent implements OnInit {

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

  constructor(
    public dialogRef: MatDialogRef<AddCustomerDialogComponent>) { }

  ngOnInit(): void {
    setInterval(() => {
      console.log(this.entryDate)
    }, 500)

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
