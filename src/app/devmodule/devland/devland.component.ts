import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devland',
  templateUrl: './devland.component.html',
  styleUrls: ['./devland.component.scss']
})
export class DevlandComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('dev land page');
  }

  navclick(event) {
    console.log(event);
  }
}
