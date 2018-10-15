import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevloginapiService } from './core/devloginapi.service';

import { SharedModule } from '../../shared/shared.module';
import { NotificationsModule } from '../../commonmodules/notifications/notifications.module';

import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DevloginRoutingModule } from './devlogin-routing-module';

import { DevloginComponent } from './devlogin/devlogin.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NotificationsModule,
    MaterialModule,
    FlexLayoutModule,
    DevloginRoutingModule
  ],
  declarations: [
    DevloginComponent
  ],
  providers: [
    DevloginapiService
  ]
})
export class DevloginmoduleModule { }
