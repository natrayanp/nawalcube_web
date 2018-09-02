import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseauthService } from '../../../../../services/firebaseauth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-devavailappcard',
  templateUrl: './devavailappcard.component.html',
  styleUrls: ['./devavailappcard.component.scss']
})
export class DevavailappcardComponent implements OnInit {

  @Input() public mode;
  @Input() public initappname;
  @Input() public editmode;
  @Output() rbchange: EventEmitter<number> = new EventEmitter<number>();
  isfull: boolean;
  appname: string;
  showallapp: boolean;
  constructor(
                private auth: FirebaseauthService,
                private router: Router,
              ) { }

  ngOnInit() {
    console.log(this.initappname);
    this.appname = this.initappname;
    if (this.mode === 'full') {
      this.isfull = true;
    } else {
      this.isfull = false;
    }
    if (this.editmode) {
      this.showallapp = false;
    } else {
      this.showallapp = true;
    }
  }

  tt() {
    this.isfull = !this.isfull;
  }

  radioChange(event) {
    console.log(event);
    this.rbchange.emit(event.value);
  }

  createapp(appnme) {
    console.log(appnme);
    this.auth.selectedapp = appnme;
    this.router.navigate(['/developers/devsecure/devapp']);

  }
}
