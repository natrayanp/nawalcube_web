import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  screenWidth: number;
  public sidenav: any;

  constructor() {
      // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
    // set screenWidth on screen size change
    this.screenWidth = window.innerWidth;
  };
  }
}
