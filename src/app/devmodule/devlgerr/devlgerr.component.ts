import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { NotifyService } from '../../commonmodules/notifications/notify.service';
import {ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devlgerr',
  templateUrl: './devlgerr.component.html',
  styleUrls: ['./devlgerr.component.scss']
})
export class DevlgerrComponent implements OnInit, AfterViewChecked {
  id1: string;
  constructor(
                private notify: NotifyService,
                private cdref: ChangeDetectorRef,
                private router: Router
              ) { }

  ngOnInit() {
    this.id1 = this.notify.get_unq_id();
    console.log('insdie devlgerr' + this.id1);
  }

  ngAfterViewChecked() {
    this.notify.update(this.id1, 'Login failed', 'error', 'alert', 'no');
    this.cdref.detectChanges();
  }

  navclick(event) {
    switch (event) {
      case ('login'): {
        this.router.navigate(['/authlogin'], { queryParams: { request: 'yenn' } });
        break;
      }
      case ('register'): {
        this.router.navigate(['/signup']);
        break;
      }
    }
  }

}
