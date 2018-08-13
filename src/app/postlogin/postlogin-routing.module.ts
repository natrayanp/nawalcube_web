import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlglandComponent } from './plgland/plgland.component';

const routes: Routes = [
  { path: '', component: PlglandComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostloginRoutingModule { }
