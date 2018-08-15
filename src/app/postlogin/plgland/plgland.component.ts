import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { DialogsService } from '../../commonmodules/dialogs/dialogs.service';


@Component({
  selector: 'app-plgland',
  templateUrl: './plgland.component.html',
  styleUrls: ['./plgland.component.scss']
})
export class PlglandComponent implements OnInit {

  constructor(
                private router: Router,
                private auth: FirebaseauthService,
                private dialog: DialogsService,
              ) { }

  ngOnInit() {
    console.log(this.auth.firebase_user);
  }

//   shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/, /(^|\.)local\$/].some(h => h.test(window.location.host));

 navclick(eve) {
  console.log('before log out in pgland');
  console.log(this.auth.firebase_user);
  if (eve === 'logout') {
    const mydialog  = this.dialog.showalert('Logout', 'We are working on your request, please wait');
    this.auth.fire_logout()
    .then((user) => {
      console.log(user);
      console.log('after log out in pgland');
      console.log(this.auth.firebase_user);
      this.router.navigate(['/']);
      mydialog.close();
    })
    .catch((error) => {
          console.log(error);
          mydialog.close();
    });
  }
}



navclicktest() {
  this.auth.fire_logout()
  .then((user) => {
    console.log(user);
    console.log('after log out in pgland');
    console.log(this.auth.firebase_user);
  })
  .catch((error) => {
        console.log(error);
  });
}

}
