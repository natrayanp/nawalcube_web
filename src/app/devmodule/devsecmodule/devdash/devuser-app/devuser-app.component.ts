import { Component, OnInit } from '@angular/core';
import { DevmodService } from '../../../core/devmod.service';
import { NotifyService } from '../../../../commonmodules/notifications/notify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogsService } from '../../../../commonmodules/dialogs/dialogs.service';

@Component({
  selector: 'app-devuser-app',
  templateUrl: './devuser-app.component.html',
  styleUrls: ['./devuser-app.component.scss']
})
export class DevuserAppComponent implements OnInit {
  id1: string;
  apps: any;
  fetch_app: boolean;
  mydialog: any;


  constructor(
              private http: DevmodService,
              private notify: NotifyService,
              private router: Router,
              private dialog: DialogsService,
            ) { }

  ngOnInit() {
    this.id1 = this.notify.get_unq_id();
    this.fetch_appdet();
  }

  fetch_appdet() {
    this.mydialog = this.dialog.showalert('Fetch app data', 'We are working on your request, please wait');
    this.fetch_app = true;
    this.http.devmodapipost('appfetch', '')
    .subscribe(
      (datas: any) => {
                  console.log(datas);
                  console.log(datas.body.result_data);
                  this.apps = datas.body.result_data;
                  // this.apps = { "apppk": 1, "appname": "", "appusertype": "T", "redirecturi": "https://localhost:4200", "postbackuri": "", "description": "my app to test", "starmfdet": "", "appid": "46d89275370c3740a15d7239d8bcbe4adc213efd721f5779e43e9fd00fae58c4", "appkey": "957eed717e5c229f664aa819a934e15a", "delflg": "N", "userid": "xeoIBrJmi5aCGCGaZmSUe3TWmor1", "octime": "2018-08-31T14:47:59.235689+00:00", "lmtime": "2018-08-31T14:47:59.235689+00:00", "entityid": "NAWALCUBE", "countryid": "IN" };
                  this.fetch_app = false;
                  this.mydialog.close();
                },
      (error) => {
                  this.fetch_app = false;
                  console.log(error);
                  if (error.error.usrmsg !== undefined || error.error.usrmsg !== '') {
                      this.notify.update(this.id1, error.error.usrmsg, 'error', 'alert', 'no');
                  } else {
                    this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
                  }
                  this.mydialog.close();
      },
      () => {
        this.mydialog.close();
      }

    );
  }

  createapp() {
    this.router.navigate(['/developers/devsecure/devapp']);
  }

  deleteapp(event) {
    this.notify.update(this.id1, event, 'success', 'alert', 'yes');
    this.fetch_appdet();
  }

}
