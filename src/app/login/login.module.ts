import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NotificationsModule } from '../commonmodules/notifications/notifications.module';

import { LoginLandComponent } from './login-land/login-land.component';
import { SingupComponent } from './singup/singup.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';



@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    NotificationsModule
  ],
  declarations: [
    LoginLandComponent,
    SingupComponent,
    ForgotpassComponent
  ]
})
export class LoginModule { }
