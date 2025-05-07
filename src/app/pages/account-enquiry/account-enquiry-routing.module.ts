import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountEnquiryComponent } from './account-enquiry.component';

const routes: Routes = [{ path: '', component: AccountEnquiryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountEnquiryRoutingModule { }
