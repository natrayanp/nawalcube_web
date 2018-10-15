import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NologinRoutingModule } from './nologin-routing.module';
import { HomepageComponent } from './homepage/homepage.component';




@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NologinRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [HomepageComponent]
})
export class NologinModule { }
