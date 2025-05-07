import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
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
  ApexTooltip
} from "ng-apexcharts";

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
  colors: any;
  legend: any;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip
};

@Component({
  selector: 'single-line-graph',
  templateUrl: './single-line-graph.component.html',
  styleUrls: ['./single-line-graph.component.scss']
})
export class SingleLineGraphComponent implements OnInit, AfterViewInit {
  graphDataAsArray!: { x: string; y: any; }[];
  @ViewChild('singleLineGraph') set singleLineGraphRef(ref: ChartComponent) {
    if (!!ref) {
      this.singleLineGraphTmpl = ref;
    }
  }
  @Input() set graphData(graphObj: any) {
    const graphArray = []
    for (const key in graphObj) {
      if (Object.prototype.hasOwnProperty.call(graphObj, key)) {
        const element = graphObj[key];
        graphArray.push({x: key, y: element})
      }
    }
    this.graphDataAsArray = graphArray;
  }
  @Input() seriesName: string | undefined;
  @Input() toolTipName: string | undefined;
  singleLineGraphTmpl: any;
  public chartOptions: Partial<ChartOptions> | any;
  constructor(currencyPipe: CurrencyPipe) {
    this.chartOptions = {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false
        },
        stacked: false,
        fontFamily: 'C-book',
        toolbar: {
          show: false,
        }
      },
      colors: ['#1633a3'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "smooth"
      },

      xaxis: {
        type: 'category'
      },
      fill: {
        type: "gradient",
      },
      markers: {
        size: 0,
        // colors: ["#FFA41B"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      yaxis: {
        tickAmount: 6,
        labels: {
          formatter: (value: number) => { return currencyPipe.transform(value, ' ') }
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        enabled: true
      }
    };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.singleLineGraphTmpl.series = [{ name: this.toolTipName, data: this.graphDataAsArray }]
    this.singleLineGraphTmpl.title = {
      text: this.seriesName,
      align: "left"
    }
  }
}
