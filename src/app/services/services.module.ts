import { NgModule, ModuleWithProviders } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';


import { FirebaseauthService } from './firebaseauth.service';
import { NatHttpService } from './http.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { NatinterceptorService } from './natinterceptor.service';

import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    FirebaseauthService,
    NatHttpService,
    NatinterceptorService,
    {provide: HTTP_INTERCEPTORS, useClass: NatinterceptorService, multi: true, },
  ],
  declarations: [],
})
export class ServicesModule { }
