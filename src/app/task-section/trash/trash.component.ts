import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  trashNotes = [];

  constructor(private route: ActivatedRoute, public firestore: AngularFirestore, public dialog: MatDialog, public shared: SharedService, public ts: TaskService, private router: Router ) { }

  ngOnInit(): void {
    this.getTrashNotes();
  }

  getTrashNotes() {
    for (let i = 0; i < this.ts.myNotes.length; i++) {
      const element = this.ts.myNotes[i];
      if (this.ts.myNotes[i].project == this.ts.event.projectName
        && !this.ts.myNotes[i].archive
        && this.ts.myNotes[i].trash) {
        this.trashNotes.push(element)
      }
    }
  }

  emptyTrash(projectName) {
    for (let i = 0; i < this.ts.myNotes.length; i++) {
      const element = this.ts.myNotes[i].noteID;
      if(this.ts.myNotes[i].project == projectName && this.ts.myNotes[i].trash)
      this.firestore
      .collection('notes')
      .doc(this.ts.myNotes[i].noteID)
      .delete()
    }
    this.router.navigate([`tasks/task/${this.ts.event.projectID}`])
  }
}
