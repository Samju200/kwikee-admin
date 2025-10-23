import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module.ts';
import { ChartComponent } from './chart.component';

@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule, // This is CRITICAL - provides ngStyle, currency pipe, etc.
    ChartRoutingModule,
  ],
})
export class ChartModule {}
