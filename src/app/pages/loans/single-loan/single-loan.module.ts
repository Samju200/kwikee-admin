import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleLoanRoutingModule } from './single-loan-routing.module';
import { EmployerNamePipe, SingleLoanComponent } from './single-loan.component';
import { SharedModule } from '@shared/shared.module';
import { CustomSelectModule } from '@shared/components/custom-select/custom-select.module';


@NgModule({
  declarations: [
    SingleLoanComponent,
    EmployerNamePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomSelectModule,
    SingleLoanRoutingModule
  ]
})
export class SingleLoanModule { }
