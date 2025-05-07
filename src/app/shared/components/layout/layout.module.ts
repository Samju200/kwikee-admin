import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { TopbarModule } from '../topbar/topbar.module';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    TopbarModule,
    FooterModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
