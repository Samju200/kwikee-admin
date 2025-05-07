import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KwikliteDetailsComponent } from './kwiklite-details.component';

const routes: Routes = [{ path: '', component: KwikliteDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KwikliteDetailsRoutingModule { }
