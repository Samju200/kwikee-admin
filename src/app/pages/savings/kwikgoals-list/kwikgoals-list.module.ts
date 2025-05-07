import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KwikgoalsListRoutingModule } from './kwikgoals-list-routing.module';
import { SharedModule } from '@shared/shared.module';
import { KwikgoalsListComponent } from './kwikgoals-list.component';


@NgModule({
  declarations: [
    KwikgoalsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    KwikgoalsListRoutingModule
  ]
})
export class KwikgoalsListModule { }
