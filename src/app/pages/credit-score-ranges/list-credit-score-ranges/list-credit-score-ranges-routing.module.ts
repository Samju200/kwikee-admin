// list-credit-score-ranges-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCreditScoreRangesComponent } from './list-credit-score-ranges.component';

const routes: Routes = [
  { path: '', component: ListCreditScoreRangesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCreditScoreRangesRoutingModule {}
