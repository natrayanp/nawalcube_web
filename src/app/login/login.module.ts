import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginLandComponent } from './login-land/login-land.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [LoginLandComponent]
})
export class LoginModule { }
