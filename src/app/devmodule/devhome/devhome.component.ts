import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devhome',
  templateUrl: './devhome.component.html',
  styleUrls: ['./devhome.component.scss']
})
export class DevhomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
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
