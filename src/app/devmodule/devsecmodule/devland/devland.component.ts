import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseauthService } from '../../../services/firebaseauth.service';
import { DialogsService } from '../../../commonmodules/dialogs/dialogs.service';
import { SidenavService } from '../../../services/sidenav.service';
import { DevmodService } from '../../core/devmod.service';
import { NavItem } from '../devsecmodels/nav-items';

@Component({
  selector: 'app-devland',
  templateUrl: './devland.component.html',
  styleUrls: ['./devland.component.scss']
})
export class DevlandComponent implements OnInit {
  navItems: NavItem[];
  @ViewChild('devsidenav') public devsidenav;
  custtyp: string;
  constructor(
                private router: Router,
                private route: ActivatedRoute,
                private auth: FirebaseauthService,
                private dialog: DialogsService,
                public snav: SidenavService,
                private http: DevmodService,
              ) {  }

  ngOnInit() {
    this.custtyp = "N";
    console.log('dev land page');
    this.snav.sidenav = this.devsidenav;
    console.log(this.router.url);
    if (this.router.url === '/developers/devsecure') {
      this.auth.afAuth.idTokenResult
      .subscribe (
        (res) => {
          this.auth.tknclaims = res;
          this.custtyp = res.claims.custtype;
          console.log(res);
          console.log(res.claims.custtype);
          if (res.claims.custtype === 'A'){
            this.router.navigate(['/developers/devsecure/devadsb']);  
          } else {
          this.router.navigate(['/developers/devsecure/devdsb']);
        }
        }
      )

    // this.router.navigate([{outlets: {devout: ['devdash']}}], {relativeTo: this.route});
  }
  this.set_nav_item();
}

  navclick(eve) {
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
    } else if (eve === 'sidenav') {
        this.toggle_sidenav();
    }
  }
    toggle_sidenav() {
      this.snav.sidenav.toggle();
    }
    
    tgbtcl(event) {
      console.log(event);
    }

    set_nav_item() {
      this.navItems = [
        {
          displayName: 'Dashboard',
          iconName: 'recent_actors',
          route: '/developers/devsecure/devdsb'
        },
        {
          displayName: 'Create App',
          iconName: 'videocam',
          route: '/developers/devsecure/devapp'
        }
      ];
    }
  
  }
