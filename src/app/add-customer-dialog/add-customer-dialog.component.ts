import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// interface branches {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.scss']
})
export class AddCustomerDialogComponent implements OnInit {

  branches: any[] = [
    {value: 'Gastronomie', viewValue: 'Gastronomie'},
    {value: 'Modegeschäft', viewValue: 'Modegeschäft'},
    {value: 'Blumengeschäft', viewValue: 'Blumengeschäft'},
    {value: 'Versicherungen', viewValue: 'Versicherungen'},
    {value: 'Buchhandlung', viewValue: 'Buchhandlung'},
    {value: 'Apotheke', viewValue: 'Apotheke'},
    {value: 'Drogerie', viewValue: 'Drogerie'},
    {value: 'Praxis', viewValue: 'Praxis'},
  ];

  // value: any;
  selectedBranch: any;

  name: string;
  company: string;
  membernumber: string;
  tel: string;
  mobile: string;
  email: string;
  street: string;
  postcode: string;
  town: string;
  entryDate: any;
  // value: any;

  constructor(
    public dialogRef: MatDialogRef<AddCustomerDialogComponent>) { }

  ngOnInit(): void {
    // setInterval(() => {
    //   console.log(this.selectedBranch)
    // }, 500)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
