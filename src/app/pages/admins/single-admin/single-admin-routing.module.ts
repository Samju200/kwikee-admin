import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleAdminComponent } from './single-admin.component';

const routes: Routes = [{ path: '', component: SingleAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleAdminRoutingModule { }
