import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-kwiklite-list',
  templateUrl: './kwiklite-list.component.html',
  styleUrls: ['./kwiklite-list.component.scss']
})
export class KwikliteListComponent implements OnInit {

  pageSize = 15;
  pageIndex = 1;
  totalDataRecord = 0;
  searchText = '';
  allSavingsData: Array<any> = [];
  allSavingsTableData: any;
  loading = true;
  status = '1'
  fraud: string | undefined = undefined;
  type = '1';
  destroy$ = new Subject<boolean>();

  constructor(private service: ProjectService, private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.queryParams.subscribe((param: Params) => {
      this.status = param['status'] ? param['status'] : '1'
      this.fetchKwikLiteSavings()
    })
  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchKwikLiteSavings() {
    this.loading = true;
    const params = {
      status:this.status,
      page_size: this.pageSize,
      page: this.pageIndex,
      search_text: this.searchText,
    }
    this.service.fetchKwikLiteSavings(params).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.loading = false;
      this.allSavingsTableData = data.data;
      this.allSavingsData = data.data.data;
      console.log(data);
      this.totalDataRecord = data.data.total
    }, () => this.loading = false)
  }

  filterProductType(type: string) {
    this.type = type;
    this.fetchKwikLiteSavings();
  }

  searchSavings(search: string) {
    this.searchText = search;
    this.fetchKwikLiteSavings();
  }

  exportKwikLiteList() {
    const params = {
      status: this.status,
    };
    this.service.exportKwikLiteList(params)
  }

  paginateData(page: number) {
    this.pageIndex = page;
    this.fetchKwikLiteSavings();
  }

  pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.fetchKwikLiteSavings();
  }

  filterStatus(status: string | undefined) {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { status } });
  }

}
