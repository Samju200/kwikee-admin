import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KwikgoalsListComponent } from './kwikgoals-list.component';

const routes: Routes = [{ path: '', component: KwikgoalsListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KwikgoalsListRoutingModule { }
