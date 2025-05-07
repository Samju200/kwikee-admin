import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent implements OnInit, OnDestroy {
  pageSize = 15;
  pageIndex = 1;
  totalDataRecord = 0;
  searchText = '';
  allCustomersData: Array<any> = [];
  allCustomersTableData: any;
  loading = false;
  status = '0'
  fraud: string | undefined = undefined;
  type = 1;
  destroy$ = new Subject<boolean>();

  constructor(private service: ProjectService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.fetchAllCustomers();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete()
  }

  fetchAllCustomers() {
    this.loading = true;
    const params = {
      search_text: this.searchText,
      page_size: this.pageSize,
      page: this.pageIndex,
      customer_module: 1
    }
    this.service.fetchAllCustomers(params).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.loading = false;
      this.allCustomersTableData = data;
      this.allCustomersData = data.data;
      this.totalDataRecord = data.total
    }, () => this.loading = false)
  }

  searchTransactions() {
    // this.searchText = search;
    this.fetchAllCustomers();
  }

  paginateData(page: number) {
    this.pageIndex = page;
    this.fetchAllCustomers();
  }

  pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.fetchAllCustomers();
  }
}
