import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleSavingComponent } from './single-saving.component';

const routes: Routes = [{ path: '', component: SingleSavingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleSavingRoutingModule { }
