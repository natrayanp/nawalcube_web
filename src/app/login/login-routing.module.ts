import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginLandComponent } from './login-land/login-land.component';
import { SingupComponent } from './singup/singup.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';

const routes: Routes = [
  { path: 'login', component: LoginLandComponent },
  { path: 'signup', component: SingupComponent },
  { path: 'forgot', component: ForgotpassComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
