import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SingleLineGraphComponent } from './single-line-graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    SingleLineGraphComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports: [
    SingleLineGraphComponent
  ],
  providers: [
    CurrencyPipe
  ]
})
export class SingleLineGraphModule { }
