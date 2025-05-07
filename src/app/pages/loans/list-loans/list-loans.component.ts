import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-loans',
  templateUrl: './list-loans.component.html',
  styleUrls: ['./list-loans.component.scss']
})
export class ListLoansComponent implements OnInit, OnDestroy {
  pageSize = 15;
  pageIndex = 1;
  totalDataRecord = 0;
  searchText = '';
  allLoansData: Array<any> = [];
  allLoansTableData: any;
  loading = true;
  status = '0'
  type = 1;
  destroy$ = new Subject<boolean>();

  constructor(private service: ProjectService, private router: Router, private alertService: AlertService, private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe((param: Params) => {
      this.status = param['status'] ? param['status'] : '0'
      this.fetchLoans()
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchLoans() {
    this.loading = true;
    const params = {
      status: this.status,
      page_size: this.pageSize,
      search_text: this.searchText,
      page: this.pageIndex
    }
    this.service.fetchLoans(params).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.loading = false;
      this.allLoansTableData = data;
      this.allLoansData = data.data;
      this.totalDataRecord = data.total
    }, () => this.loading = false)
  }

  exportLoans() {
    const params = {
      status: this.status,
      page_size: this.pageSize,
      search_text: this.searchText
    };
    this.service.exportLoans(params)
  }

  paginateData(page: number) {
    this.pageIndex = page;
    this.fetchLoans();
  }

  pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.fetchLoans();
  }

  searchLoans(search: string) {
    this.searchText = search;
    this.fetchLoans();
  }

  filterStatus(status: string | undefined) {
    // this.fraud = status;
    // this.fetchLoans();
    this.pageSize = 15;
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { status } });
  }
}
