import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListLoansRoutingModule } from './list-loans-routing.module';
import { ListLoansComponent } from './list-loans.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ListLoansComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ListLoansRoutingModule
  ]
})
export class ListLoansModule { }
