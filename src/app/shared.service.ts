import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  darkmode: boolean = false;

  constructor() { }
}
