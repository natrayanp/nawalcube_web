import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlglandComponent } from './plgland/plgland.component';

import { AuthGuardService } from '../services/auth-guard.service';


const routes: Routes = [
  { path: '', component: PlglandComponent, canLoad: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostloginRoutingModule { }
