import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module.ts';
import { ChartComponent } from './chart.component';
import { DownloadModalComponent } from './download-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChartComponent, DownloadModalComponent],
  imports: [
    CommonModule, // This is CRITICAL - provides ngStyle, currency pipe, etc.
    ChartRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ChartModule {}
