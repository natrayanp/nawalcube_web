import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { AuthoriseModule } from './authorise/authorise.module';
import { DialogsModule } from './commonmodules/dialogs/dialogs.module';
import { NotificationsModule } from './commonmodules/notifications/notifications.module';
import { NologinModule } from './nologin/nologin.module';
import { PostloginModule } from './postlogin/postlogin.module';
import { DevmoduleModule } from './devmodule/devmodule.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServicesModule,
    SharedModule,
    LoginModule,
    AuthoriseModule,
    DialogsModule,
    NotificationsModule,
    NologinModule,
    PostloginModule,
    DevmoduleModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
