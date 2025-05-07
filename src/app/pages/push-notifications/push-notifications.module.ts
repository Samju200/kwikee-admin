import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PushNotificationsRoutingModule } from './push-notifications-routing.module';
import { PushNotificationsComponent } from './push-notifications.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    PushNotificationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PushNotificationsRoutingModule
  ]
})
export class PushNotificationsModule { }
