import { Component, OnInit } from '@angular/core';
import { installation } from '../environments/environment';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';


  ngOnInit() {
    sessionStorage.setItem('entityid', installation.entityid);
    sessionStorage.setItem('countryid', installation.countryid);
  }
  }
}