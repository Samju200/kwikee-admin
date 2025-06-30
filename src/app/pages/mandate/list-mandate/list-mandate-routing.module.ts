import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListMandateComponent } from './list-mandate.component';

const routes: Routes = [{ path: '', component: ListMandateComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMandateRoutingModule {}
