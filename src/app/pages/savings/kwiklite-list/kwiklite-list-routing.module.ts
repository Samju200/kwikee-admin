import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KwikliteListComponent } from './kwiklite-list.component';

const routes: Routes = [{ path: '', component: KwikliteListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KwikliteListRoutingModule { }
