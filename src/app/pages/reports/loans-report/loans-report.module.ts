import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansReportRoutingModule } from './loans-report-routing.module';
import { LoansReportComponent } from './loans-report.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    LoansReportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoansReportRoutingModule
  ]
})
export class LoansReportModule { }
