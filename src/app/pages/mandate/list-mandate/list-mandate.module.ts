import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMandateComponent } from './list-mandate.component';
import { ListMandateRoutingModule } from './list-mandate-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListMandateComponent],
  imports: [CommonModule, SharedModule, ListMandateRoutingModule, FormsModule],
})
export class ListMandateModule {}
