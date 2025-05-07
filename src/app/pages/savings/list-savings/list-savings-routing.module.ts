import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSavingsComponent } from './list-savings.component';

const routes: Routes = [{ path: '', component: ListSavingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListSavingsRoutingModule { }
