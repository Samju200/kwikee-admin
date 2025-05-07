import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCompaniesRoutingModule } from './list-companies-routing.module';
import { ListCompaniesComponent } from './list-companies.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ListCompaniesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListCompaniesRoutingModule
  ]
})
export class ListCompaniesModule { }
