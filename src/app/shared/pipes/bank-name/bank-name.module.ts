import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankNamePipe } from './bank-name.pipe';



@NgModule({
  declarations: [
    BankNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BankNamePipe
  ]
})
export class BankNameModule { }
