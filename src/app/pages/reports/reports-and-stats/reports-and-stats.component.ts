import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reports-and-stats',
  templateUrl: './reports-and-stats.component.html',
  styleUrls: ['./reports-and-stats.component.scss']
})
export class ReportsAndStatsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  isFetchingData = false;
  loansData: Array<any> = [];
  savingsData: Array<any> = [];
  totalSavingsLast12Months: any;
  walletData:any;
  loanBookLast12Months: any;
  revenueLast12Months: any;
  pageData: any;
  constructor(private service: ProjectService) { }

  ngOnInit(): void {
    this.fetchReportAndStatistics();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete()
  }

  fetchReportAndStatistics() {
    this.isFetchingData = true;
    this.service.getReportAndStats().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: any) => {
        this.isFetchingData = false;
        this.pageData = data;
        this.loansData = data.loan;
        this.savingsData = data.savings;
        this.walletData = data.wallet;
        this.totalSavingsLast12Months = data.total_savings_last_12_months;
        this.loanBookLast12Months = data.loan_book_last_12_months;
        this.revenueLast12Months = data.revenue_last_12_months;
      },
      error: () => this.isFetchingData = false
    })
  }
}
