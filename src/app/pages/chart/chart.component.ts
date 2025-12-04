import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '@core/services/project.service';
interface GLDownloadParams {
  account_number: string;
  start_date: string;
  end_date: string;
  format?: 'pdf' | 'csv' | 'excel';
}

interface GLQuickDownloadParams {
  account_number: string;
  start_date: string;
  end_date: string;
  format: 'pdf' | 'csv' | 'excel';
}
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
  showDownloadModal = false;
  selectedAccountNumber = '';

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
  // Add these new methods for download functionality
  openDownloadModal(accountNumber: string) {
    this.selectedAccountNumber = accountNumber;
    this.showDownloadModal = true;
  }

  closeDownloadModal() {
    this.showDownloadModal = false;
    this.selectedAccountNumber = '';
  }

  // Quick download for today's transactions
  quickDownloadToday(accountNumber: string) {
    const today = new Date().toISOString().split('T')[0];

    const params: GLQuickDownloadParams = {
      account_number: accountNumber,
      start_date: today,
      end_date: today,
      format: 'pdf',
    };

    this.service.downloadGLTransactions(params).subscribe({
      next: (response) => {
        this.downloadFile(response.blob, response.filename);
        this.toastr.success(
          `Today's transactions downloaded for ${accountNumber}`,
          'Success'
        );
      },
      error: (error) => {
        this.toastr.error(
          error.error?.message || 'Failed to download transactions',
          'Error'
        );
      },
    });
  }

  // Download for a custom date range
  downloadDateRange(
    accountNumber: string,
    startDate: string,
    endDate: string,
    format: 'pdf' | 'csv' | 'excel' = 'pdf'
  ) {
    const params: GLQuickDownloadParams = {
      account_number: accountNumber,
      start_date: startDate,
      end_date: endDate,
      format: format,
    };

    this.service.downloadGLTransactions(params).subscribe({
      next: (response) => {
        this.downloadFile(response.blob, response.filename);
        this.toastr.success(
          `Transactions downloaded for ${accountNumber}`,
          'Success'
        );
      },
      error: (error) => {
        this.toastr.error(
          error.error?.message || 'Failed to download transactions',
          'Error'
        );
      },
    });
  }
  private downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // Optional: View transactions without downloading
  viewTransactions(accountNumber: string, startDate: string, endDate: string) {
    const params = {
      account_number: accountNumber,
      start_date: startDate,
      end_date: endDate,
    };

    this.service.getGLTransactions(params).subscribe({
      next: (response) => {
        if (response.success) {
          // Handle the transaction data - you could display it in a modal or another component
          console.log('Transactions:', response);
          this.toastr.success(
            `Found ${response.summary.total_transactions} transactions`,
            'Success'
          );
        } else {
          this.toastr.error(response.message, 'Error');
        }
      },
      error: (error) => {
        this.toastr.error(
          error.error?.message || 'Failed to fetch transactions',
          'Error'
        );
      },
    });
  }
}
