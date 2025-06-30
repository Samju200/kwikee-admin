import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SingleMandateComponent } from './single-mandate.component';

const routes: Routes = [{ path: '', component: SingleMandateComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleMandateRoutingModule {}
