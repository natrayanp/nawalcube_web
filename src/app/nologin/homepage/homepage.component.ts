import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
              private router: Router
            ) { }

  ngOnInit() {
  }

  navclick(event) {
    switch (event) {
      case ('login'): {
        this.router.navigate(['/login']);
        break;
      }
      case ('register'): {
        this.router.navigate(['/signup']);
        break;
      }
      case ('developers'): {
        this.router.navigate(['/developers']);
        break;
      }

    }
  }



  



}
