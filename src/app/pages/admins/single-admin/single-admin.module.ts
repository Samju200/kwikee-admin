import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleAdminRoutingModule } from './single-admin-routing.module';
import { SingleAdminComponent } from './single-admin.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    SingleAdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SingleAdminRoutingModule
  ]
})
export class SingleAdminModule { }
