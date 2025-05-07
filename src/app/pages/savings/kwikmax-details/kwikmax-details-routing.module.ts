import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KwikmaxDetailsComponent } from './kwikmax-details.component';

const routes: Routes = [{ path: '', component: KwikmaxDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KwikmaxDetailsRoutingModule { }
