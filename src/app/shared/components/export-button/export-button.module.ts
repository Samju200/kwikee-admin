import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportButtonComponent } from './export-button.component';



@NgModule({
  declarations: [ExportButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ExportButtonComponent
  ]
})
export class ExportButtonModule { }
