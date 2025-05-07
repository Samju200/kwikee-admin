import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KwikmaxDetailsRoutingModule } from './kwikmax-details-routing.module';
import { SharedModule } from '@shared/shared.module';
import { KwikmaxDetailsComponent } from './kwikmax-details.component';


@NgModule({
  declarations: [
    KwikmaxDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    KwikmaxDetailsRoutingModule
  ]
})
export class KwikmaxDetailsModule { }
