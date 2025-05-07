import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAdminsRoutingModule } from './list-admins-routing.module';
import { ListAdminsComponent } from './list-admins.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ListAdminsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListAdminsRoutingModule
  ]
})
export class ListAdminsModule { }
