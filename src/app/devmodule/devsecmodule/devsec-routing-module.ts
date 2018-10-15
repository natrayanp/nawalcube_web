import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevlandComponent } from './devland/devland.component';
import { DevcreappComponent } from './devcreapp/devcreapp.component';
import { DevdashComponent } from './devdash/devdash.component';
import { DevdashadminComponent } from './devdashadmin/devdashadmin.component';

const routes: Routes = [
  { path: '', component: DevlandComponent,
    children : [
      { path: 'devdsb', component: DevdashComponent},
      { path: 'devadsb', component: DevdashadminComponent},
      // { path: 'devapp/:appid', component: DevcreappComponent},
      { path: 'devapp', component: DevcreappComponent}
    ]
}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DevsecureRoutingModule { }
