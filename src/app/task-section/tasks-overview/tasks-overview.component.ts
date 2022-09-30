import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tasks-overview',
  templateUrl: './tasks-overview.component.html',
  styleUrls: ['./tasks-overview.component.scss']
})
export class TasksOverviewComponent implements OnInit {

  constructor(public firestore: AngularFirestore) { }

  myProjects;

  ngOnInit(): void {
    this.getProjectsFromFirestore();
  }

  getProjectsFromFirestore() {
    this.firestore
      .collection('projects')
      .valueChanges()
      .subscribe((projects: any) => {
        console.log(this.myProjects)
        this.myProjects = projects;
      });
  }
}
