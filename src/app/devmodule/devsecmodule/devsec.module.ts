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
import { DevavailappComponent } from './devdash/devavailapp/devavailapp.component';
import { DevavailappcardComponent } from './devdash/devavailapp/devavailappcard/devavailappcard.component';
import { DevuserAppComponent } from './devdash/devuser-app/devuser-app.component';
import { DevuserAppCardComponent } from './devdash/devuser-app/devuser-app-card/devuser-app-card.component';
import { DevdashadminComponent } from './devdashadmin/devdashadmin.component';

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
    DevdashComponent,
    DevavailappComponent,
    DevavailappcardComponent,
    DevuserAppComponent,
    DevuserAppCardComponent,
    DevdashadminComponent
  ]
})
export class DevsecModule { }
