import { Component, Input, OnChanges, OnInit, DoCheck,SecurityContext,
         AfterContentInit, AfterViewInit, AfterViewChecked,
         AfterContentChecked, OnDestroy } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser'
import { NotifyService } from '../notify.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent
implements OnChanges, OnInit, DoCheck, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, OnDestroy {
  @Input() public id: string;
  alert_id: string;
  private subscription: any;

  constructor(public notify: NotifyService,  private sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('insider alerts');
    console.log(this.id);
    this.alert_id = this.id;
    /*
    console.log(this.alert_id);
    console.log('ngOnInit child');
    console.log(this.notify.alertmsg);
    this.subscription = this.notify.alertmsg.subscribe ((res) => {
      console.log(res);
    });
    */
 }

 sanitizemy(html) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
 //return this.sanitizer.bypassSecurityTrustStyle(html);
}

 ngOnChanges() {
  // console.log('ngOnChanges child', this.alert_id);
}



ngDoCheck() {
  // console.log('ngDoCheck child');
}

ngAfterContentInit() {
  // console.log('ngAfterContentInit child');
}

ngAfterContentChecked() {
  // console.log('ngAfterContentChecked child');
}

ngAfterViewInit() {
  // console.log('ngAfterViewInit child');
}

ngAfterViewChecked() {
  // console.log('ngAfterViewChecked child');
}

ngOnDestroy() {
  // this.subscription.unsubscribe();
}


}
