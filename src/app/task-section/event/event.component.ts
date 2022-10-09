import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { NewNoteComponent } from '../new-note/new-note.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event;
  myNotes: any = [];
  eventID;
  constructor(private route: ActivatedRoute, public firestore: AngularFirestore, public dialog: MatDialog, public shared: SharedService) { }

  ngOnInit(): void {
    this.getParamsOfEvent();
    this.getNotesFromFirestore();
  }

  getParamsOfEvent() {
    this.route.params.subscribe(para => {
      this.eventID = para['id'];
    });
    this.getEvent();
  }

  getEvent() {
    this.firestore
      .collection('projects')
      .doc(this.eventID)
      .valueChanges()
      .subscribe((event: any) => {
        this.event = event;
      });
  }

  getNotesFromFirestore() {
    this.firestore
      .collection('notes')
      .valueChanges()
      .subscribe((notes: any) => {
        this.myNotes = notes;
        this.filterProjects(notes);
      });
  }

  filterProjects(notes) {
    this.myNotes = [];
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note.project == this.event.projectName) {
        this.myNotes.push(notes[i]);
        console.log(notes[i])
      }
    }

    console.log(this.myNotes)
  }

  openNoteDialog() {

    let noteDialog = this.dialog.open(NewNoteComponent);


    noteDialog.afterClosed().subscribe((notes) => {
      console.log(notes)
      this.saveToFirestore(notes);
    });
  }

  saveToFirestore(notes) {

    let date = new Date;
    let formattedDate = date.toLocaleDateString()
    this.firestore
      .collection('notes')
      .add({
        employee: notes.employee,
        note: notes.note,
        project: this.event.projectName,
        date: formattedDate
      })
  }
}
