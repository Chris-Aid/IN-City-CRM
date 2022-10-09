import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from './customer-section/add-note/add-note.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  darkmode: boolean = false;

  constructor(public dialog: MatDialog, public firestore: AngularFirestore) { }

}
