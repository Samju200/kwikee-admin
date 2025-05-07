import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KwikliteDetailsRoutingModule } from './kwiklite-details-routing.module';
import { SharedModule } from '@shared/shared.module';
import { KwikliteDetailsComponent } from './kwiklite-details.component';


@NgModule({
  declarations: [
    KwikliteDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    KwikliteDetailsRoutingModule
  ]
})
export class KwikliteDetailsModule { }
