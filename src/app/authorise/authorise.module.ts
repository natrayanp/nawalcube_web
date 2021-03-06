import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotificationsModule } from '../commonmodules/notifications/notifications.module';

import { AuthoriseRoutingModule } from './authorise-routing.module';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthAllowComponent } from './auth-allow/auth-allow.component';
import { AuthOutletComponent } from './auth-outlet/auth-outlet.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    NotificationsModule,
    AuthoriseRoutingModule,
    SharedModule
  ],
  declarations: [
    AuthLoginComponent,
    AuthAllowComponent,
    AuthOutletComponent
  ]
})
export class AuthoriseModule { }
