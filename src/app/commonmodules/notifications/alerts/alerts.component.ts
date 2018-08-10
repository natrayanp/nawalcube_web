import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../notify.service';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  constructor(public notify: NotifyService) {console.log(notify.alertmsg); }

  ngOnInit() {
  }

}
