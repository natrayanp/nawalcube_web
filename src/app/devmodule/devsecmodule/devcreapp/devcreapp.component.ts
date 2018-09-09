import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../../../services/firebaseauth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DevmodService } from '../../core/devmod.service';
import { NotifyService } from '../../../commonmodules/notifications/notify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-devcreapp',
  templateUrl: './devcreapp.component.html',
  styleUrls: ['./devcreapp.component.scss']
})
export class DevcreappComponent implements OnInit {
  id1: string;
  id2: string;
  custtyp: string;
  custtypid: string;
  selectedapp = '';
  appform: FormGroup;
  ishowapp: boolean;
  succ_scrn: boolean;
  appid: string;
  editmode: boolean;
  toolbr_nme = 'Create App';

  empty_app_det = {
                    'appname': '',
                    'appusertype': '',
                    'redirecturi': 'https://',
                    'postbackuri': 'https://',
                    'description': '',
                    'starmfdet' : 'MEMBERID=***;USERID=***;PASSWORD=***;',
                    'product' : '',
                    'appid': '',
                    'appkey': ''
                  };


  constructor(
              private router: Router,
              private auth: FirebaseauthService,
              private fb: FormBuilder,
              private http: DevmodService,
              private notify: NotifyService,
              private route: ActivatedRoute
            ) { }

  ngOnInit() {
    console.log('insdie devcreate');
    console.log(this.appid);
    console.log(this.editmode);
    this.id1 = this.notify.get_unq_id();
    this.id2 = this.notify.get_unq_id();
    this.succ_scrn = false;
    // this.appid = this.route.snapshot.paramMap.get('appid');
    this.route.params.subscribe(params => {
      console.log(params);
      if (JSON.stringify(params) === '{}') {
        this.toolbr_nme = 'Create App';
        this.createappForm(this.empty_app_det);
        this.editmode = false;
        this.checkfor_selected_app();
        this.set_validators();
        this.http.get_cust_type_desc(this.auth.tknclaims.custtype);
        this.appform.get('appusertype').setValue(this.custtyp);
      } else {
        this.toolbr_nme = 'Edit App';
        this.editmode = true;
        this.get_app_details();
      }
    });

  }


  createappForm(frmdata) {
    this.appform = this.fb.group({
      'appname': [frmdata.appname, Validators.compose([Validators.required])],
      'appusertype': [this.custtyp],
      'redirecturi': [frmdata.redirecturi, Validators.compose([Validators.required])],
      'postbackuri': [frmdata.postbackuri],
      'description': [frmdata.description],
      'starmfdet': [frmdata.starmfdet, Validators.compose([Validators.required])],
      'product': [frmdata.product, Validators.compose([Validators.required])],
      'appid': [frmdata.appid],
      'appkey': [frmdata.appkey]
    });

  }


  set_validators() {
    if (this.editmode) {
        this.appform.clearValidators();
        this.appform.updateValueAndValidity();
        /*this.appform.get('appname').clearValidators();
        this.appform.get('appname').updateValueAndValidity();
        this.appform.get('product').clearValidators();
        this.appform.get('product').updateValueAndValidity();
        this.appform.get('starmfdet').clearValidators();
        this.appform.get('starmfdet').updateValueAndValidity();*/
    } else {
      this.appform.get('starmfdet').clearValidators();
      this.appform.get('starmfdet').updateValueAndValidity();
    }
}

  copy_clip_brd(inputElement) {
      inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0);
  }
/*
         this.signupForm.get('adhaar')
            .setValidators(Validators.compose([Validators.required, Validators.maxLength(12), Validators.pattern(/[0-9]{12}/)]));
          this.signupForm.get('adhaar').updateValueAndValidity();


                    this.signupForm.get('adhaar').clearValidators();
          this.signupForm.get('adhaar').updateValueAndValidity();

*/
  rbchange(ev) {
    this.auth.selectedapp = ev;
    console.log(ev);
    this.checkfor_selected_app();
    console.log(this.custtyp);
  }

  checkfor_selected_app() {
  console.log(this.auth.selectedapp);
  if (this.auth.selectedapp === '') {
    this.ishowapp = false;
  } else {
    this.selectedapp = this.auth.selectedapp;
    console.log(this.selectedapp);
    this.ishowapp = true;
  }
  if (!this.editmode) {
    this.appform.get('product').setValue(this.selectedapp);
  }
  this.auth.selectedapp = '';
  }

  sub_create_app(operationt) {
    let apidata = JSON.stringify(this.appform.value);
    apidata = JSON.parse(apidata);
    apidata['appusertype'] = this.auth.tknclaims.custtype;
    apidata['operation'] = operationt;
    this.http.devmodapipost('appreg', apidata)
    .subscribe(
      (datas: any) => {
                  console.log(datas);
                  console.log(datas.body);
                  console.log(datas.body.usrmsg);
                  this.succ_scrn = true;
                  this.notify.update(this.id1, datas.body.usrmsg, 'success', 'alert', 'no');
                },
      (error) => {
                  console.log(error);
                  if (error.error.usrmsg !== undefined || error.error.usrmsg !== '') {
                      this.notify.update(this.id2, error.error.usrmsg, 'error', 'alert', 'no');
                  } else {
                    this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
                  }
      }

    );
  }

get_app_details() {
  const apidata = {
    'appid' : this.appid
  };
  this.http.devmodapipost('appfetch', apidata)
  .subscribe(
    (datas: any) => {
                console.log(datas);
                console.log(datas.body.result_data);
                console.log( datas.body.result_data[0].product);
                this.auth.selectedapp = datas.body.result_data[0].product;
                this.checkfor_selected_app();
                this.http.get_cust_type_desc(datas.body.result_data[0].appusertype);
                console.log('done');
                this.createappForm(datas.body.result_data[0]);
                this.set_validators();
                console.log(this.appform.value);
                console.log(this.selectedapp);
                console.log(this.appid);
                this.auth.fbappid = this.appid;
                console.log(this.editmode);
                this.auth.fbeditmode = this.editmode;
              },
    (error) => {
                console.log(error);
                if (error.error.usrmsg !== undefined || error.error.usrmsg !== '') {
                    this.notify.update(this.id2, error.error.usrmsg, 'error', 'alert', 'no');
                } else {
                  this.notify.update(this.id1, error.message, 'error', 'alert', 'no');
                }
    }

  );
}


clear_validations() {
  this.appform.get('');
}

/*
this.checkfor_selected_app();
this.http.get_cust_type_desc();
this.appform.get('appusertype').setValue(this.custtyp);
*/


cancel_app_edit() {
  this.router.navigate(['/developers/devsecure/devdsb']);
}

}
