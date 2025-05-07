import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoansReportComponent } from './loans-report.component';

const routes: Routes = [{ path: '', component: LoansReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoansReportRoutingModule { }
