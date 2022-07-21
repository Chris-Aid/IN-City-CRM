import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-termination',
  templateUrl: './set-termination.component.html',
  styleUrls: ['./set-termination.component.scss']
})
export class SetTerminationComponent implements OnInit {

  terminationDate: any;
  terminationReason: any;
  constructor() { }

  ngOnInit(): void {
  }

}
