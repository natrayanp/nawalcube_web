import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NotificationsModule } from '../commonmodules/notifications/notifications.module';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DevmoduleRoutingModule } from './devmodule-routing.module';

import { DevhomeComponent } from './devhome/devhome.component';
// import { DevlandComponent } from './devland/devland.component';
import { DevlgerrComponent } from './devlgerr/devlgerr.component';
// import { DevcreappComponent } from './devcreapp/devcreapp.component';
// import { DevdashComponent } from './devdash/devdash.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NotificationsModule,
    MaterialModule,
    FlexLayoutModule,
    DevmoduleRoutingModule
  ],
  declarations: [
    DevhomeComponent,
    // DevlandComponent,
    DevlgerrComponent,
    // DevcreappComponent,
    // DevdashComponent
  ]
})
export class DevmoduleModule { }
