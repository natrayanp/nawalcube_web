import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevlandComponent } from './devland/devland.component';
import { DevcreappComponent } from './devcreapp/devcreapp.component';
import { DevdashComponent } from './devdash/devdash.component';

const routes: Routes = [
  { path: '', component: DevlandComponent,
    children : [
      { path: 'devdsb', component: DevdashComponent},
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
