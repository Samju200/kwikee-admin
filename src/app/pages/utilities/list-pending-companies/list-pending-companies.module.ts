import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCompaniesRoutingModule } from './list-pending-companies-routing.module';
import { ListPendingCompanies } from './list-pending-companies.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ListPendingCompanies
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListCompaniesRoutingModule
  ]
})
export class ListPendingCompaniesModule { }
