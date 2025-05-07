import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserReportRoutingModule } from './user-report-routing.module';
import { UserReportComponent } from './user-report.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    UserReportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserReportRoutingModule
  ]
})
export class UserReportModule { }
