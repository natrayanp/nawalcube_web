import { NgModule, ModuleWithProviders } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { FirebaseauthService } from './firebaseauth.service';
import { NatHttpService } from './http.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NatinterceptorService } from './natinterceptor.service';
import { SidenavService } from './sidenav.service';
import { AuthGuardService } from './auth-guard.service';

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
    SidenavService,
    AuthGuardService
  ],
  declarations: [],
})
export class ServicesModule { }

