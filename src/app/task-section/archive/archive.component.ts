import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  constructor(private route: ActivatedRoute, public firestore: AngularFirestore, public dialog: MatDialog, public shared: SharedService, public ts: TaskService) { }

  ngOnInit(): void {
  }

  restoreNote(ID) {
    this.firestore
    .collection('notes')
    .doc(ID)
    .update({ archive: false });
  }
}
