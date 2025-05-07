import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBeneficiaryComponent } from './add-beneficiary.component';

const routes: Routes = [{ path: '', component: AddBeneficiaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBeneficiaryRoutingModule { }
