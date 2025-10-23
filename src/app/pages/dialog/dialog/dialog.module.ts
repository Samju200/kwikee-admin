import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogRoutingModule } from './dialog-routing.module';
import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add this for formGroup, formControlName
    DialogRoutingModule,
  ],
})
export class DialogModule {}
