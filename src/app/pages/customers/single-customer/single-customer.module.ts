import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleCustomerRoutingModule } from './single-customer-routing.module';
import { SingleCustomerComponent } from './single-customer.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    SingleCustomerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SingleCustomerRoutingModule
  ]
})
export class SingleCustomerModule { }
