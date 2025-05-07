import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListKwikMaxRatesComponent } from './list-kwik-max-rates.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [{ path: '', component: ListKwikMaxRatesComponent }];

@NgModule({
  declarations: [ListKwikMaxRatesComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class ListKwikMaxRatesModule {}
