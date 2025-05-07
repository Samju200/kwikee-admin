import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleSavingRoutingModule } from './single-saving-routing.module';
import { SingleSavingComponent } from './single-saving.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    SingleSavingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SingleSavingRoutingModule
  ]
})
export class SingleSavingModule { }
