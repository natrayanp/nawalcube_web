import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthAllowComponent } from './auth-allow/auth-allow.component';


const routes: Routes = [
  { path: 'authlogin', component: AuthLoginComponent },
  { path: 'allow', component: AuthAllowComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthoriseRoutingModule { }
