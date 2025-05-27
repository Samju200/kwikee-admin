import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.scss'],
})
export class ListTransactionsComponent implements OnInit, OnDestroy {
  pageSize = 15;
  pageIndex = 1;
  totalDataRecord = 0;
  searchText = '';
  allTransactionsData: Array<any> = [];
  allTransactionsTableData: any;
  loading = true;
  type = 1;
  destroy$ = new Subject<boolean>();

  // Date filter properties initialized with empty strings
  startDate = '';
  endDate = '';

  constructor(
    private service: ProjectService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.fetchAllTransactions();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchAllTransactions() {
    this.loading = true;
    const params = {
      search_text: this.searchText,
      page_size: this.pageSize,
      page: this.pageIndex,
      product_mode: this.type,
      start: this.startDate || undefined, // Send undefined if empty string
      end: this.endDate || undefined,
    };

    this.service
      .fetchAllTransactions(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.allTransactionsTableData = data;
          this.allTransactionsData = data.data;
          this.totalDataRecord = data.total;
        },
        () => (this.loading = false)
      );
  }

  searchTransactions(search: string) {
    this.searchText = search;
    this.pageIndex = 1;
    this.fetchAllTransactions();
  }

  filterByDate() {
    this.pageIndex = 1;
    this.fetchAllTransactions();
  }

  filterProductType(type: number) {
    this.type = type;
    this.pageIndex = 1;
    this.fetchAllTransactions();
  }

  paginateData(page: number) {
    this.pageIndex = page;
    this.fetchAllTransactions();
  }

  pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.fetchAllTransactions();
  }
}
