import { NgModule } from '@angular/core';

import { SingupRoutingModule } from './singup-routing.module';
import { SingupComponent } from './singup/singup.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SingupRoutingModule,
    SharedModule
  ],
  declarations: [SingupComponent]
})
export class SingupModule { }
