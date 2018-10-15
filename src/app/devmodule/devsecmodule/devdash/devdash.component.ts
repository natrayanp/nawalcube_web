import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-devdash',
  templateUrl: './devdash.component.html',
  styleUrls: ['./devdash.component.scss']
})
export class DevdashComponent implements OnInit {

  constructor(
                private router: Router,
                private route: ActivatedRoute,
            ) { }

  ngOnInit() {
  }

  createapp() {
    console.log('create a new app');
    console.log(this.route.url);
    this.router.navigate(['/developers/devsecure/devapp']);
    // this.router.navigate([{outlets: {devout: ['devapp']}}], {relativeTo: this.route});
  }





}
