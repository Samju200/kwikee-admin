import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsAndStatsRoutingModule } from './reports-and-stats-routing.module';
import { ReportsAndStatsComponent } from './reports-and-stats.component';
import { SingleLineGraphModule } from '@shared/components/single-line-graph/single-line-graph.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ReportsAndStatsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SingleLineGraphModule,
    ReportsAndStatsRoutingModule
  ]
})
export class ReportsAndStatsModule { }
