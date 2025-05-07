import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from './components/kb-pagination/kb-pagination.module';
import { LoadingSpinnerModule } from './components/loading-spinner/loading-spinner.module';
import { BankNameModule } from './pipes/bank-name/bank-name.module';
import { SearchInputModule } from './components/search-input/search-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterModule } from './pipes/search-filter/search-filter.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationModule,
    LoadingSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    BankNameModule,
    SearchFilterModule,
    SearchInputModule,
  ]
})
export class SharedModule { }
