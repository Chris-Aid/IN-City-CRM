import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {


  constructor(public dialog: MatDialog, public firestore: AngularFirestore, public service: EventsService) { }

  ngOnInit(): void {
    this.getEventsFromFiresore();
  }

  addEvent() {
    let dialogRef = this.dialog.open(AddEventComponent, {
      height: '220px',
      panelClass: 'dialogHight'
      // width: '600px',
    });

    dialogRef.afterClosed().subscribe(({ eventName }) => {
      let e = {
        name: eventName,
      }
      this.saveToFirestore(e)
    });
  }

  saveToFirestore(e) {
      this.firestore
      .collection('events')
      .add(e)
      .then((event: any) => {
        this.firestore
          .collection('events')
          .doc(event.id)
          .update({ eventID: event.id });
      });
  }

  getEventsFromFiresore() {
    this.firestore
    .collection('events')
    .valueChanges()
    .subscribe((event: any) => {
      this.service.events = event;

    });
  }
}
