import { NgModule } from '@angular/core';

import {
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatRadioModule,
    MatCheckboxModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  exports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatRadioModule,
    MatCheckboxModule
  ]
})
export class MaterialModule {}