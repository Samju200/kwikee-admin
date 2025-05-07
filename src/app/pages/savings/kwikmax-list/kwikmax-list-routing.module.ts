import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KwikmaxListComponent } from './kwikmax-list.component';

const routes: Routes = [{ path: '', component: KwikmaxListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KwikmaxListRoutingModule { }
