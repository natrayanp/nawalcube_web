import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DisplayDialogComponent } from './display-dialog/display-dialog.component';

import { DialogsService } from './dialogs.service';

// import { MatButtonModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [ConfirmDialogComponent, DisplayDialogComponent],
  exports: [],
  entryComponents: [ConfirmDialogComponent, DisplayDialogComponent],
  providers: [DialogsService]
})
export class DialogsModule { }