import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevhomeComponent } from './devhome/devhome.component';
import { DevlandComponent } from './devland/devland.component';
import { DevlgerrComponent } from './devlgerr/devlgerr.component';

const routes: Routes = [
  { path: 'devhome', component: DevhomeComponent },
  { path: 'devsecure', component: DevlandComponent },
  { path: 'devlgerr', component: DevlgerrComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevmoduleRoutingModule { }
