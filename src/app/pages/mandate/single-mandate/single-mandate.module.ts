import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleMandateComponent } from './single-mandate.component';
import { SingleMandateRoutingModule } from './single-mandate-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SingleMandateComponent],
  imports: [
    CommonModule,
    SharedModule,
    SingleMandateRoutingModule,
    FormsModule,
  ],
})
export class SingleMandateModule {}
