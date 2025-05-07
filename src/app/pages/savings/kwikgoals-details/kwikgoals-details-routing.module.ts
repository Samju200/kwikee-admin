import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KwikgoalsDetailsComponent } from './kwikgoals-details.component';

const routes: Routes = [{ path: '', component: KwikgoalsDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KwikgoalsDetailsRoutingModule { }
