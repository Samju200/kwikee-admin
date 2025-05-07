import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListCreditScoreRangesComponent } from './list-credit-score-ranges.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  { path: '', component: ListCreditScoreRangesComponent },
];

@NgModule({
  declarations: [ListCreditScoreRangesComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class ListCreditScoreRangesModule {}
