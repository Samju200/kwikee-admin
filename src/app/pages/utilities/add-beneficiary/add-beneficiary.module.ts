import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBeneficiaryRoutingModule } from './add-beneficiary-routing.module';
import { AddBeneficiaryComponent } from './add-beneficiary.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    AddBeneficiaryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AddBeneficiaryRoutingModule
  ]
})
export class AddBeneficiaryModule { }
