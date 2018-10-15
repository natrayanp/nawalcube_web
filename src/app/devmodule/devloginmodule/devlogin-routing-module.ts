import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevloginComponent } from './devlogin/devlogin.component';

const routes: Routes = [
  { path: '', component: DevloginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevloginRoutingModule { }
