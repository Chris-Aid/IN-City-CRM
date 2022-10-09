import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  myProjects = [];
  project: string;
  employee: string;
  note: string;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  // isLinear = false;

  constructor(private _formBuilder: FormBuilder, public shared: SharedService, public firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.firestore
      .collection('projects')
      .valueChanges()
      .subscribe((projects) => {
        this.pushProjectsToArray(projects);

      });
    console.log(this.myProjects)
  }

  pushProjectsToArray(projects) {
    for (let i = 0; i < projects.length; i++) {
      this.myProjects.push({ value: projects[i]['projectName'], viewValue: projects[i]['projectName'] })
    }
  }

}
