import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KwikliteListRoutingModule } from './kwiklite-list-routing.module';
import { SharedModule } from '@shared/shared.module';
import { KwikliteListComponent } from './kwiklite-list.component';


@NgModule({
  declarations: [
    KwikliteListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    KwikliteListRoutingModule
  ]
})
export class KwikliteListModule { }
