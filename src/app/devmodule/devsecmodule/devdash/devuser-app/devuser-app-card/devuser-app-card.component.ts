import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifyService } from '../../../../../commonmodules/notifications/notify.service';
import { DialogsService } from '../../../../../commonmodules/dialogs/dialogs.service';
import { DevmodService } from '../../../../core/devmod.service';
import { FirebaseauthService } from '../../../../../services/firebaseauth.service';

@Component({
  selector: 'app-devuser-app-card',
  templateUrl: './devuser-app-card.component.html',
  styleUrls: ['./devuser-app-card.component.scss']
})
export class DevuserAppCardComponent implements OnInit {
  @Input() public app;
  @Output() delsucalrt: EventEmitter<any> = new EventEmitter<any>();
  value = 'Clear me';
  id1: string;

  constructor(
    private router: Router,
    private notify: NotifyService,
    private dialog: DialogsService,
    private http: DevmodService,
    private auth: FirebaseauthService
  ) { }

  ngOnInit() {
    console.log(this.app);
  }

  copy_clip_brd(inputElement) {
    console.log('clc');
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
}

editapp() {
this.router.navigate(['/developers/devsecure/devapp', {'appid': this.app.appid}]);
}

deleapp() {
  const mydialog = this.dialog.deletealert('App Delete Alert', 'The action cant be revereted.  Please confirm');
  mydialog.subscribe(
    res => {
      if (res) {
        this.sub_create_app('delete');
      } else {
        this.notify.update(this.id1, 'User cancelled app delete request', 'error', 'alert', 'no');
      }
    });

}

sub_create_app(operationt) {
  console.log(this.app);
  const apidata = this.app;
  apidata['appusertype'] = this.auth.tknclaims.custtype;
  apidata['operation'] = operationt;
  this.http.devmodapipost('appreg', apidata)
  .subscribe(
    (datas: any) => {
                console.log(datas);
                console.log(datas.body);
                console.log(datas.body.usrmsg);
                // this.succ_scrn = true;                
                this.delsucalrt.emit(datas.body.usrmsg);
              },
    (error) => {
                console.log(error);
                if (error.error.usrmsg !== undefined || error.error.usrmsg !== '') {
                    this.notify.update(this.id1, error.error.usrmsg, 'error', 'alert', 'no');
                } else {
                  this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
                }
    }

  );
}

}
