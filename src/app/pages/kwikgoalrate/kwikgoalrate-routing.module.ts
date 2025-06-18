import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KwikgoalrateComponent } from './kwikgoalrate.component';

const routes: Routes = [{ path: '', component: KwikgoalrateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KwikgoalrateRoutingModule { }
