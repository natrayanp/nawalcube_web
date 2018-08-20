import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from '../../services/firebaseauth.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
              private router: Router,
              private auth: FirebaseauthService
            ) { }

  ngOnInit() {
    console.log(this.auth.firebase_user);
  }

  navclick(event) {
    console.log(event);
    switch (event) {
      case ('login'): {
        this.router.navigate(['/login']);
        break;
      }
      case ('register'): {
        this.router.navigate(['/login/signup']);
        break;
      }
      case ('developers'): {
        this.router.navigate(['/developers']);
        break;
      }

    }
  }



  



}
