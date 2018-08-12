import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { PostloginRoutingModule } from './postlogin-routing.module';
import { DashComponent } from './dash/dash.component';
import { PlglandComponent } from './plgland/plgland.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PostloginRoutingModule
  ],
  declarations: [
    DashComponent,
    PlglandComponent]
})
export class PostloginModule { }
