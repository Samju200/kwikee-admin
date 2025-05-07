import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KwikmaxListRoutingModule } from './kwikmax-list-routing.module';
import { SharedModule } from '@shared/shared.module';
import { KwikmaxListComponent } from './kwikmax-list.component';


@NgModule({
  declarations: [
    KwikmaxListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    KwikmaxListRoutingModule
  ]
})
export class KwikmaxListModule { }
