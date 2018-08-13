import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  @Input() public sourcepage: string;
  @Output() navclickevnt: EventEmitter<any> = new EventEmitter();

  screen: string;

  toolbr = true;
  leftspan = true;
  comlogo_sec = true;
  comlogo_txt1 = true;
  comlogo_txt1val: string;
  comlogo_txt2 = false;
  comlogo_txt2val: string;
  comlogo_txt3 = false;
  comlogo_txt3val: string;
  mid_section = true;
  mid_devlnk = true;
  end_section = true;
  end_reglnk = true;
  end_loglnk = true;
  end_logoutlnk = true;

  constructor() { }

  ngOnInit() {
    this.screen = this.sourcepage;
    console.log(this.screen);
    this.set_display();
  }

  singup(btn) {
    this.navclickevnt.emit(btn);
  }

  set_display() {

    switch (this.screen) {
      case ('devhomepg'): {
        this.set_dev_hm_pg();
        break;
      }
      case ('devland'): {
        this.set_dev_hm_pg();
        this.leftspan = false;
        this.end_loglnk = false;
        this.end_logoutlnk = true;
        break;
      }
      case ('devlgerr'): {
        this.set_dev_hm_pg();
        break;
      }
      case ('homepg'): {
        this.set_hm_pg();
        break;
      }
      case ('plgland'): {
        this.set_hm_pg();
        this.leftspan = false;
        this.mid_section = false;
        this.end_reglnk = false;
        this.end_loglnk = false;
        this.end_logoutlnk = true;
        break;
      }


    }

  }

  set_dev_hm_pg() {
    this.toolbr = true;
    this.leftspan = true;
    this.comlogo_sec = true;
    this.comlogo_txt1 = true;
    this.comlogo_txt1val = 'Nawalcube';
    this.comlogo_txt2 = true;
    this.comlogo_txt2val = '-';
    this.comlogo_txt3 = true;
    this.comlogo_txt3val = 'API';
    this.mid_section = false;
    this.mid_devlnk = false;
    this.end_section = true;
    this.end_reglnk = false;
    this.end_loglnk = true;
    this.end_logoutlnk = false;
  }
  
  
  set_hm_pg() {
  this.toolbr = true;
  this.leftspan = true;
  this.comlogo_sec = true;
  this.comlogo_txt1 = true;
  this.comlogo_txt1val = 'Nawalcube';
  this.comlogo_txt2 = false;
  this.comlogo_txt2val = '-';
  this.comlogo_txt3 = false;
  this.comlogo_txt3val = '';
  this.mid_section = true;
  this.mid_devlnk = true;
  this.end_section = true;
  this.end_reglnk = true;
  this.end_loglnk = true;
  this.end_logoutlnk = false;
  }
}
