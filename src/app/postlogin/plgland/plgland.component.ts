import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plgland',
  templateUrl: './plgland.component.html',
  styleUrls: ['./plgland.component.scss']
})
export class PlglandComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }




 shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/, /(^|\.)local\$/].some(h => h.test(window.location.host));

 navclick(eve) {
  if (eve === 'login') {

  }
}
}
