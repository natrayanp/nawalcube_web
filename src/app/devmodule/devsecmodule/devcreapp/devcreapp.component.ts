import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devcreapp',
  templateUrl: './devcreapp.component.html',
  styleUrls: ['./devcreapp.component.scss']
})
export class DevcreappComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  copy_clip_brd(inputElement) {
      inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0);
  }
}
