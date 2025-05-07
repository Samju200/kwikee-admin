import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AccountEnquiryComponent } from './account-enquiry.component';
import { AccountEnquiryRoutingModule } from './account-enquiry-routing.module';



@NgModule({
  declarations: [
    AccountEnquiryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountEnquiryRoutingModule
  ]
})
export class AccountEnquiryModule { }
