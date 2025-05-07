import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-savings',
  templateUrl: './list-savings.component.html',
  styleUrls: ['./list-savings.component.scss']
})
export class ListSavingsComponent implements OnInit, OnDestroy {

  pageSize = 15;
  pageIndex = 1;
  totalDataRecord = 0;
  searchText = '';
  allSavingsData: Array<any> = [];
  allSavingsTableData: any;
  loading = true;
  status = '0'
  fraud: string | undefined = undefined;
  type = '1';
  destroy$ = new Subject<boolean>();

  constructor(private service: ProjectService, private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.queryParams.subscribe((param: Params) => {
      this.status = param['status'] ? param['status'] : '0'
      this.fetchAllSavings(this.status)
    })
  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchAllSavings(status = '0') {
    this.loading = true;
    const params = {
      status,
      page_size: this.pageSize,
      page: this.pageIndex,
      search_text: this.searchText,
      type: this.type,
    }
    this.service.fetchAllSavings(params).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.loading = false;
      this.allSavingsTableData = data;
      this.allSavingsData = data.data;
      this.totalDataRecord = data.total
    }, () => this.loading = false)
  }

  filterProductType(type: string) {
    this.type = type;
    this.fetchAllSavings();
  }

  searchSavings(search: string) {
    this.searchText = search;
    this.fetchAllSavings(this.status);
  }

  paginateData(page: number) {
    this.pageIndex = page;
    this.fetchAllSavings();
  }

  pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.fetchAllSavings();
  }

  filterStatus(status: string | undefined) {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { status } });
  }

}
