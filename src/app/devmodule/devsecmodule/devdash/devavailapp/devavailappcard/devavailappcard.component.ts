import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-devavailappcard',
  templateUrl: './devavailappcard.component.html',
  styleUrls: ['./devavailappcard.component.scss']
})
export class DevavailappcardComponent implements OnInit {

  @Input() public mode;
  isfull: boolean;
  constructor() { }

  ngOnInit() {
    if (this.mode === 'full') {
      this.isfull = true;
    } else {
      this.isfull = false;
    }
  }

  tt() {
    this.isfull = !this.isfull;
  }
}
