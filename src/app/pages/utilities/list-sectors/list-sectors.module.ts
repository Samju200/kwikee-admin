import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListSectorsRoutingModule } from './list-sectors-routing.module';
import { ListSectorsComponent } from './list-sectors.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ListSectorsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListSectorsRoutingModule
  ]
})
export class ListSectorsModule { }
