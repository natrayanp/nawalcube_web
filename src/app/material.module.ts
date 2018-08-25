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
    MatListModule
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
    MatListModule
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
    MatListModule
  ]
})
export class MaterialModule {}