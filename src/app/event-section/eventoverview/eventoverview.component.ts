import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../events.service';

export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-eventoverview',
  templateUrl: './eventoverview.component.html',
  styleUrls: ['./eventoverview.component.scss']
})


export class EventoverviewComponent implements OnInit {

    item: string;
    cost: number;

  

  displayedColumns = ['item', 'cost'];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];

  eventID;
  eventInfo;
  dataLoaded;
  constructor(private route: ActivatedRoute, public service: EventsService, public firestore: AngularFirestore ) { }

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
    .collection('events')
    .doc(this.eventID)
    .valueChanges()
    .subscribe((event: any) => {
      this.eventInfo = event;
      this.dataLoaded = true;
      console.log(this.eventInfo.name)
    });
  }
}
