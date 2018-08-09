import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginLandComponent } from './login-land/login-land.component';

const routes: Routes = [
  { path: 'login', component: LoginLandComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
