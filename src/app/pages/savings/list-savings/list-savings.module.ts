import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListSavingsRoutingModule } from './list-savings-routing.module';
import { ListSavingsComponent } from './list-savings.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ListSavingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListSavingsRoutingModule
  ]
})
export class ListSavingsModule { }
