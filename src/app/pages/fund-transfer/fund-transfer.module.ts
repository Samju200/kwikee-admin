import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FundTransferComponent } from './fund-transfer.component';
import { FundTransferRoutingModule } from './fund-transfer-routing.module';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [FundTransferComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FundTransferRoutingModule,
    // ToastrModule, // Removed .forRoot()
  ],
  exports: [FundTransferComponent],
})
export class FundTransferModule {}
