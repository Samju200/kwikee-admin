import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPendingCompanies } from './list-pending-companies.component';

const routes: Routes = [{ path: '', component: ListPendingCompanies }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCompaniesRoutingModule { }
