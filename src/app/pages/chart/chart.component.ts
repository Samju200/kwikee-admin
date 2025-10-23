import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '@core/services/project.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  response: any;
  assets: any;
  chart: any;
  loading: any;
  page = 1;
  page_size = 10;
  status: any = 0;
  nullstatus: any = null;
  searchText = '';
  date_from = '';
  date_to = '';
  prev: any;
  next: any;
  chartData: any;
  expenditures: any;
  incomes: any;
  liabilities: any;
  totalAssets: number = 0;
  totalIncome: number = 0;
  totalExpenditure: number = 0;
  totalLiability: number = 0;

  assetState = false;
  liabilityState = false;
  incomeState = false;
  expenditureState = false;

  constructor(
    private route: Router,
    private service: ProjectService,
    private toastr: ToastrService,
    titleService: Title
  ) {
    titleService.setTitle('Chart of Accounts');
  }

  ngOnInit(): void {
    this.getChart();
  }

  changeAssets() {
    this.assetState = !this.assetState;
  }

  changeLiability() {
    this.liabilityState = !this.liabilityState;
  }

  changeIncome() {
    this.incomeState = !this.incomeState;
  }

  changeExpenditure() {
    this.expenditureState = !this.expenditureState;
  }

  openForm() {
    this.route.navigate(['/add-newgl']);
  }

  getChart() {
    this.loading = true;

    this.service.getChartOfAccounts().subscribe(
      (data) => {
        const result: any = data;
        if (result.status === 'success') {
          this.assets = result.data.assets;
          this.incomes = result.data.incomes;
          this.expenditures = result.data.expenditures;
          this.liabilities = result.data.liabilities;

          this.totalAssets = result.data.totalAssets;
          this.totalExpenditure = result.data.totalExpenditures;
          this.totalIncome = result.data.totalIncomes;
          this.totalLiability = result.data.totalLiabilities;
          console.log(result);
        } else {
          this.toastr.success(result['message'], '');
        }
        this.loading = false;
      },
      (error) => {
        this.toastr.error(
          'Error connecting to server, please check your internet connection and try again'
        );
        this.loading = false;
      }
    );
  }
}
