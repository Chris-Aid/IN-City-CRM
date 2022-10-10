import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { SharedService } from "src/app/shared.service";
import { AddNoteComponent } from "../add-note/add-note.component";
import { DeletingCustomerDialogComponent } from "../deleting-customer-dialog/deleting-customer-dialog.component";
import { EditCustomerComponent } from "../edit-customer/edit-customer.component";
import { SetTerminationComponent } from "../set-termination/set-termination.component";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customersID: string;
  customer: any;
  hovered: number = 1;

  company: string;
  email: string;
  entryDate: string;
  member: string;
  membernumber: string;
  membershipFee: string;
  mobile: string;
  name: string;
  postcode: string;
  selectedBranch: string;
  status: string;
  street: string;
  tel: string;
  terminationDate: string;
  terminationReason: string;
  town: string;

  dateOfEntry: any;

  selected: string = "aktiv";
  showTerminationInfo = false;

  constructor(private route: ActivatedRoute, public firestore: AngularFirestore, public dialog: MatDialog, public shared: SharedService) { }

  ngOnInit(): void {
    this.getParamsOfCustomer();
  }

  getParamsOfCustomer() {
    this.route.params.subscribe(paramMap => {
      this.customersID = paramMap['id'];
    });

    this.getCustomer();
  }

  getCustomer() {
    this.firestore
      .collection('Kunden')
      .doc(this.customersID)
      .valueChanges()
      .subscribe((customer: any) => {
        this.updateCustomerInfos(customer);
        this.customer = customer;
      });
  }

  updateCustomerInfos(customer: any) {
    // console.log(customer.entryDate)
    if (customer.entryDate instanceof Date) {
      this.dateOfEntry = customer.entryDate.getDate() + "." + (customer.entryDate.getMonth() + 1) + "." + customer.entryDate.getFullYear();
    } else {
      this.dateOfEntry = customer.entryDate;
    }

    this.company = customer.company;
    this.email = customer.email;
    this.member = customer.member;
    this.entryDate = this.dateOfEntry;
    this.membernumber = customer.membernumber;
    this.membershipFee = customer.membershipFee;
    this.mobile = customer.mobile;
    this.name = customer.name;
    this.postcode = customer.postcode;
    this.selectedBranch = customer.selectedBranch;
    this.status = customer.status;
    this.street = customer.street;
    this.tel = customer.tel;
    this.terminationDate = customer.terminationDate;
    this.terminationReason = customer.terminationReason;
    this.town = customer.town;

    this.checkMembershipStatus();
  }


  changeToTerminated() {
    this.selected = "terminated";

    const dialogRef = this.dialog.open(SetTerminationComponent);
    dialogRef.componentInstance.customersID = this.customersID;
  }

  changeToActive() {
    this.firestore
      .collection('Kunden')
      .doc(this.customersID)
      .update({
        status: 'aktiv',
        terminationDate: '',
        terminationReason: ''
      })
    this.checkMembershipStatus();
  }

  checkMembershipStatus() {
    if (this.status == 'gekündigt') {
      this.selected = "gekündigt";
      this.showTerminationInfo = true;
    } else {
      this.selected = "aktiv";
    }
  }

  editCustomer() {
    const editCustomer = this.dialog.open(EditCustomerComponent, {
      disableClose: true,
      panelClass: this.shared.darkmode ? "darkMode" : "lightMode"
    });
    this.customer.entryDate = new Date(this.customer.entryDate);
    editCustomer.componentInstance.customer = this.customer;

    editCustomer.afterClosed().subscribe(({
      customer }) => {
      this.updateCustomerInfos(customer);
      this.updateFirestore();
    });
  }

  updateFirestore() {
    this.firestore
      .collection('Kunden')
      .doc(this.customersID)
      .update({
        name: this.name,
        company: this.company,
        membernumber: this.membernumber,
        tel: this.tel,
        mobile: this.mobile,
        email: this.email,
        street: this.street,
        postcode: this.postcode,
        town: this.town,
        entryDate: this.entryDate,
        selectedBranch: this.selectedBranch,
        membershipFee: this.membershipFee,
        member: this.member
      });
  }

  openDialog(): void {
    let dialog = this.dialog.open(DeletingCustomerDialogComponent);

    dialog.afterClosed().subscribe((deleteCustomer) => {
      if (deleteCustomer) {
        this.firestore
          .collection('Kunden')
          .doc(this.customersID)
          .delete();
      }
    });
  }

  openNoteDialog() {
    console.log('true')
    let noteDialog = this.dialog.open(AddNoteComponent, {
      panelClass: this.shared.darkmode ? "darkMode" : "lightMode",
    });

    noteDialog.afterClosed().subscribe((notes) => {
      this.saveToFirestore(notes);
    });
  }

  saveToFirestore(notes) {

    let date = new Date;
    let formattedDate = date.toLocaleDateString()
    this.firestore
      .collection('notes')
      .add({
        customer: this.company,
        employee: notes.employee,
        note: notes.note,
        project: notes.project,
        date: formattedDate,
        archive: false,
        trash: false
      })
      .then((noteInfo: any) => {
        this.firestore
          .collection('notes')
          .doc(noteInfo.id)
          .update({ noteID: noteInfo.id });
      });
  }
}