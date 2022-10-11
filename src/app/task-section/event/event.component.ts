import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { NewNoteComponent } from '../new-note/new-note.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  activeNotes = [];
  eventID;
  constructor(private route: ActivatedRoute, public firestore: AngularFirestore, public dialog: MatDialog, public shared: SharedService, public ts: TaskService) { }

  ngOnInit(): void {
    this.getParamsOfEvent();
    this.getNotesFromFirestore();
  }

  getActiveEvents() {
    this.activeNotes = [];
    for (let i = 0; i < this.ts.myNotes.length; i++) {
      const element = this.ts.myNotes[i];
      if (this.ts.myNotes[i].project == this.ts.event.projectName
        && !this.ts.myNotes[i].archive
        && !this.ts.myNotes[i].trash) {
        this.activeNotes.push(element)
      }
    }
    console.log(this.activeNotes)
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
        this.ts.event = event;
      });
  }

  getNotesFromFirestore() {
    this.firestore
      .collection('notes')
      .valueChanges()
      .subscribe((notes: any) => {
        this.ts.myNotes = notes;
        this.filterProjects(notes);
      });
    setTimeout(() => {
      this.getActiveEvents();
    }, 300);

  }

  filterProjects(notes) {
    this.ts.myNotes = [];
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note.project == this.ts.event.projectName) {
        this.ts.myNotes.push(notes[i]);
      }
    }
  }

  openNoteDialog() {

    let noteDialog = this.dialog.open(NewNoteComponent, {
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
        employee: notes.employee,
        note: notes.note,
        project: this.ts.event.projectName,
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

  moveToArchive(ID) {
    this.firestore
      .collection('notes')
      .doc(ID)
      .update({ archive: true });

    this.reloadNotes();
  }

  moveToTrash(ID) {
    this.firestore
      .collection('notes')
      .doc(ID)
      .update({ trash: true });

    this.reloadNotes();
  }

  reloadNotes() {
    setTimeout(() => {
      this.getActiveEvents()
    }, 200);
  }
}
