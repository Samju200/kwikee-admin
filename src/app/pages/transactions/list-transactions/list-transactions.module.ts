import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListTransactionsRoutingModule } from './list-transactions-routing.module';
import { ListTransactionsComponent } from './list-transactions.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListTransactionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListTransactionsRoutingModule
  ]
})
export class ListTransactionsModule { }
