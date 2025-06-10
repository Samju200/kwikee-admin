import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  fill: ApexFill;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  colors: string[];
  legend: any;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'single-line-graph',
  templateUrl: './single-line-graph.component.html',
  styleUrls: ['./single-line-graph.component.scss'],
})
export class SingleLineGraphComponent implements OnChanges {
  @Input() graphData: any;
  @Input() seriesName: string = '';
  @Input() toolTipName: string = '';

  public chartOptions: ChartOptions;

  constructor(private currencyPipe: CurrencyPipe) {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
        stacked: false,
        fontFamily: 'C-book',
        toolbar: {
          show: false,
        },
      },
      colors: ['#1633a3'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 3,
        curve: 'smooth',
      },
      xaxis: {
        type: 'category',
      },
      grid: {
        show: true,
        borderColor: '#e7e7e7',
        strokeDashArray: 4,
      },
      fill: {
        type: 'gradient',
      },
      markers: {
        size: 5,
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      yaxis: {
        tickAmount: 6,
        labels: {
          formatter: (value: number) => {
            return currencyPipe.transform(value, ' ') || '';
          },
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (value: number) => {
            return currencyPipe.transform(value, ' ') || '';
          },
        },
      },
      title: {
        text: this.seriesName,
        align: 'left',
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['graphData'] && this.graphData) {
      this.updateChartData();
    }

    if (changes['seriesName']) {
      this.chartOptions.title = {
        ...this.chartOptions.title,
        text: this.seriesName,
      };
    }
  }

  private updateChartData(): void {
    const graphArray = [];

    for (const key in this.graphData) {
      if (Object.prototype.hasOwnProperty.call(this.graphData, key)) {
        graphArray.push({
          x: key,
          y: this.graphData[key],
        });
      }
    }

    this.chartOptions.series = [
      {
        name: this.toolTipName,
        data: graphArray,
      },
    ];
  }
}
