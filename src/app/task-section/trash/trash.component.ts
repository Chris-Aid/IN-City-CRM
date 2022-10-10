import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  constructor(private route: ActivatedRoute, public firestore: AngularFirestore, public dialog: MatDialog, public shared: SharedService, public ts: TaskService) { }

  ngOnInit(): void {
  }

}
