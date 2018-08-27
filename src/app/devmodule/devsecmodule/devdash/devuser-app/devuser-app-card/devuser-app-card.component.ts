import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-devuser-app-card',
  templateUrl: './devuser-app-card.component.html',
  styleUrls: ['./devuser-app-card.component.scss']
})
export class DevuserAppCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  createapp() {
    this.router.navigate(['/developers/devsecure/devapp']);
  }

}
