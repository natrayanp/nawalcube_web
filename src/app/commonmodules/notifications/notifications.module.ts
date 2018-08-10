import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { NoticeComponent } from './notice/notice.component';
import { NotifyService } from './notify.service';

import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    AlertsComponent,
    NoticeComponent
  ],
  exports: [
    AlertsComponent,
    NoticeComponent
  ],
  entryComponents: [
    AlertsComponent,
    NoticeComponent
  ],
  providers: [
    NotifyService
  ]
})
export class NotificationsModule { }