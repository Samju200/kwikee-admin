import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective, CustomSelectComponent } from './custom-select.component';
import { FormsModule } from '@angular/forms';
import { SearchFilterModule } from '@shared/pipes/search-filter/search-filter.module';



@NgModule({
  declarations: [
    CustomSelectComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    SearchFilterModule,
  ],
  exports: [
    CustomSelectComponent
  ]
})
export class CustomSelectModule { }
