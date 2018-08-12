import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NotificationsModule } from '../commonmodules/notifications/notifications.module';
// import { NologinModule } from '../nologin/nologin.module';

import { LoginLandComponent } from './login-land/login-land.component';
import { SingupComponent } from './singup/singup.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';



@NgModule({
  imports: [
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
