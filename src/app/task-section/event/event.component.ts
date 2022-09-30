import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventID;
  constructor(private route: ActivatedRoute, public firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getParamsOfEvent();
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
        console.log(event)
      });
  }

}
