import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.scss']
})
export class ListTransactionsComponent implements OnInit, OnDestroy {
  pageSize = 15;
  pageIndex = 1;
  totalDataRecord = 0;
  searchText = '';
  allTransactionsData: Array<any> = [];
  allTransactionsTableData: any;
  loading = true;
  status = '0'
  fraud: string | undefined = undefined;
  type = 1;
  destroy$ = new Subject<boolean>();

  constructor(private service: ProjectService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.fetchAllTransactions()
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
      status: this.status,
      product_mode: this.type,
      fraud: this.fraud
    }
    this.service.fetchAllTransactions(params).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.loading = false;
      this.allTransactionsTableData = data;
      this.allTransactionsData = data.data;
      this.totalDataRecord = data.total
    }, () => this.loading = false)
  }

  markAsFraud(id: string) {
    if (confirm('Are you sure?')) {
      this.service.markAsFraud(id).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.loading = false;
        this.alertService.success(data['message']);
        this.fetchAllTransactions();
      }, () => this.loading = false);
    }
  }

  blockCustomer(email: string) {
    if (confirm('Are you sure?')) {
      this.service.blacklistCustomer(email).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.loading = false;
        this.alertService.success(data['message']);
        this.fetchAllTransactions();
      }, () => this.loading = false);
    }
  }

  declineTransaction(id: string) {
    if (confirm('Are you sure?')) {
      this.service.declineTransaction(id).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.loading = false;
        this.alertService.success(data['message']);
        this.fetchAllTransactions();
      }, () => this.loading = false);
    }
  }

  searchTransactions(search: string) {
    this.searchText = search;
    this.fetchAllTransactions();
  }


  filterFraud(fraud: string | undefined) {
    this.fraud = fraud;
    this.fetchAllTransactions();
  }

  filterProductType(type: number) {
    this.type = type;
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
