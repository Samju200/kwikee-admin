import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBlacklistedCompaniesComponent } from './list-blacklisted-companies.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListBlacklistedCompaniesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListBlacklistedCompaniesComponent
      }
    ])
  ]
})
export class ListBlacklistedCompaniesModule { }
