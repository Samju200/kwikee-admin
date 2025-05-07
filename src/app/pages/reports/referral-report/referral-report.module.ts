import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferralReportRoutingModule } from './referral-report-routing.module';
import { ReferralReportComponent } from './referral-report.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ReferralReportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReferralReportRoutingModule
  ]
})
export class ReferralReportModule { }
