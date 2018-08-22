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
    MatSelectModule
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
    MatButtonModule
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
    MatButtonModule
  ]
})
export class MaterialModule {}