import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { SingleLineGraphModule } from '@shared/components/single-line-graph/single-line-graph.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SingleLineGraphModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
