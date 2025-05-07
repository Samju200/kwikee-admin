import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListKwikMaxRatesComponent } from './list-kwik-max-rates.component';

const routes: Routes = [{ path: '', component: ListKwikMaxRatesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListKwikMaxRatesRoutingModule { }
