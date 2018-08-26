import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { NotificationsModule } from '../../commonmodules/notifications/notifications.module';

import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DevsecureRoutingModule } from './devsec-routing-module';

import { DevlandComponent } from './devland/devland.component';
import { DevcreappComponent } from './devcreapp/devcreapp.component';
import { DevdashComponent } from './devdash/devdash.component';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    SharedModule,
    NotificationsModule,
    MaterialModule,
    FlexLayoutModule,
    DevsecureRoutingModule
  ],
  declarations: [
    DevlandComponent,
    DevcreappComponent,
    DevdashComponent
  ]
})
export class DevsecModule { }
