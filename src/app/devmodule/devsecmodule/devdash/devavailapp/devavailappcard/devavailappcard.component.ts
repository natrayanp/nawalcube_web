import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-devavailappcard',
  templateUrl: './devavailappcard.component.html',
  styleUrls: ['./devavailappcard.component.scss']
})
export class DevavailappcardComponent implements OnInit {

  @Input() public mode;
  isfull: boolean;
  public radiobtngrp: FormGroup;
  constructor(private fb: FormBuilder,) { }

  ngOnInit() {
    if (this.mode === 'full') {
      this.isfull = true;
    } else {
      this.isfull = false;
    }
    this.radiobtngrp = this.fb.group({
      mfapi: [''],
      mfvpi: ['']
    });
  }

  tt() {
    this.isfull = !this.isfull;
  }
}
