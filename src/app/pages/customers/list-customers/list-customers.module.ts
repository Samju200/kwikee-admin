import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCustomersRoutingModule } from './list-customers-routing.module';
import { ListCustomersComponent } from './list-customers.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListCustomersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ListCustomersRoutingModule
  ]
})
export class ListCustomersModule { }
