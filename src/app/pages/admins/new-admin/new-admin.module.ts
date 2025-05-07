import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAdminRoutingModule } from './new-admin-routing.module';
import { NewAdminComponent } from './new-admin.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    NewAdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewAdminRoutingModule
  ]
})
export class NewAdminModule { }
