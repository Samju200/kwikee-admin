import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KbPaginationComponent } from './kb-pagination.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    KbPaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    KbPaginationComponent
  ]
})
export class PaginationModule { }
