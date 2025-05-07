import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KwikgoalsDetailsRoutingModule } from './kwikgoals-details-routing.module';
import { SharedModule } from '@shared/shared.module';
import { KwikgoalsDetailsComponent } from './kwikgoals-details.component';


@NgModule({
  declarations: [
    KwikgoalsDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    KwikgoalsDetailsRoutingModule
  ]
})
export class KwikgoalsDetailsModule { }
