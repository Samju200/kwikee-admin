import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleCustomerComponent } from './single-customer.component';

const routes: Routes = [{ path: '', component: SingleCustomerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleCustomerRoutingModule { }
