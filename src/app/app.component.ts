import { Component, OnInit } from '@angular/core';
import { installation } from '../environments/environment';
import { Router, NavigationEnd } from "@angular/router";
import { GaEventsService } from './services/google_analytics/ga-events.service';


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

  constructor(public router: Router, public googleAnalyticsEventsService: GaEventsService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.googleAnalyticsEventsService.emitPageview(event.urlAfterRedirects);
        // ga('set', 'page', event.urlAfterRedirects);
        // ga('send', 'pageview');
      }
    });
  }

  submitEvent() {
    this.googleAnalyticsEventsService.emitEvent("testCategory1", "testAction", "testLabel", 10);
  }

  }
