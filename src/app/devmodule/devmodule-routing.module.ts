import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevhomeComponent } from './devhome/devhome.component';
// import { DevlandComponent } from './devland/devland.component';
import { DevlgerrComponent } from './devlgerr/devlgerr.component';

import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: DevhomeComponent },
  {
    path: 'devlogin',
    loadChildren: './devloginmodule/devlogin.module#DevloginmoduleModule'
  },
  { path: 'devsecure',
    // canLoad: [AuthGuardService],
    loadChildren: './devsecmodule/devsec.module#DevsecModule'
  },
  { path: 'devlgerr', component: DevlgerrComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevmoduleRoutingModule { }
