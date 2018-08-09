import { NgModule, ModuleWithProviders } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';


import { FirebaseauthService } from './firebaseauth.service';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    FirebaseauthService
  ],
  declarations: [],
})
export class ServicesModule { }
