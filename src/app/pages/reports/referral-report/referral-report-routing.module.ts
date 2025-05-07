import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralReportComponent } from './referral-report.component';

const routes: Routes = [{ path: '', component: ReferralReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralReportRoutingModule { }
