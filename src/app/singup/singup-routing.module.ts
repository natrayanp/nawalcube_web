import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingupComponent } from './singup/singup.component';

const routes: Routes = [
  { path: 'signup', component: SingupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingupRoutingModule { }
