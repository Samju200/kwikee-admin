import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Add this import

import { KwikgoalrateRoutingModule } from './kwikgoalrate-routing.module';
import { KwikgoalrateComponent } from './kwikgoalrate.component';

@NgModule({
  declarations: [KwikgoalrateComponent],
  imports: [
    CommonModule,
    FormsModule, // <-- Add this to imports array
    KwikgoalrateRoutingModule,
  ],
})
export class KwikgoalrateModule {}
