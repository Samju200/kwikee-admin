import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsAndStatsComponent } from './reports-and-stats.component';

const routes: Routes = [{ path: '', component: ReportsAndStatsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsAndStatsRoutingModule { }
