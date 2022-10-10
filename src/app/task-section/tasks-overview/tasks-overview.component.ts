import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from 'src/app/customer-section/add-note/add-note.component';
import { SharedService } from 'src/app/shared.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { DeleteProjectComponent } from '../delete-project/delete-project.component';

@Component({
  selector: 'app-tasks-overview',
  templateUrl: './tasks-overview.component.html',
  styleUrls: ['./tasks-overview.component.scss']
})
export class TasksOverviewComponent implements OnInit {

  constructor(public firestore: AngularFirestore, public dialog: MatDialog, public shared: SharedService) { }

  myProjects;
  ngOnInit(): void {
    this.getProjectsFromFirestore();
  }

  openAddProjectDialog() {
    const addProject = this.dialog.open(AddProjectComponent, {
      panelClass: this.shared.darkmode ? "darkMode" : "lightMode",
    });

    addProject.afterClosed().subscribe((project) => {
      this.pushProjectToFirestore(project);
      console.log(project.projectDate.toLocaleDateString())
    });
  }

  openDeleteProjectDialog(ID) {
    const deleteProject = this.dialog.open(DeleteProjectComponent, {
      panelClass: this.shared.darkmode ? "darkMode" : "lightMode",
    });

    deleteProject.afterClosed().subscribe((result) => {
      console.log(result)
      if (result) {
        this.firestore
          .collection('projects')
          .doc(ID)
          .delete();
      }
    });
  }

  pushProjectToFirestore(project) {
    let name = project.projectName;
    let date = project.projectDate.toLocaleDateString();

    this.firestore
      .collection('projects')
      .add({ projectName: name, date: date })
      .then((projectInfo: any) => {
        this.firestore
          .collection('projects')
          .doc(projectInfo.id)
          .update({ projectID: projectInfo.id });
      });
  }

  getProjectsFromFirestore() {
    this.firestore
      .collection('projects')
      .valueChanges()
      .subscribe((projects: any) => {
        this.myProjects = projects;
      });
  }

  dontViewEvent(e) {
    e.stopPropagation();
  }

}
