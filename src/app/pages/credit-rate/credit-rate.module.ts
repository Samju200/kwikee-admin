import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditRateRoutingModule } from './credit-rate-routing.module';
import { FormsModule } from '@angular/forms';
import { CreditRateComponent } from './credit-rate.component';

@NgModule({
  declarations: [CreditRateComponent],
  imports: [CommonModule, FormsModule, CreditRateRoutingModule],
})
export class CreditRateModule {}
